
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, DollarSign, TrendingUp, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { portfolioData } from '@/data/portfolio';

const Experience = () => {
  // Process data for charts
  const timelineData = portfolioData.positions.map((position, index) => ({
    company: position.company,
    period: position.period,
    year: parseInt(position.period.split(' - ')[0]),
    achievements: position.achievements.length,
    tags: position.tags.length,
    hasExit: !!position.exit,
    exitType: position.exit?.type || 'None'
  }));

  // Skills data from tags
  const skillsMap = new Map();
  portfolioData.positions.forEach(position => {
    const year = parseInt(position.period.split(' - ')[0]);
    position.tags.forEach(tag => {
      if (!skillsMap.has(tag)) {
        skillsMap.set(tag, []);
      }
      skillsMap.get(tag).push(year);
    });
  });

  const skillsData = Array.from(skillsMap.entries()).map(([skill, years]) => ({
    skill,
    frequency: years.length,
    firstYear: Math.min(...years),
    lastYear: Math.max(...years),
    evolution: years.length > 1 ? 'Growing' : 'Stable'
  })).sort((a, b) => b.frequency - a.frequency).slice(0, 10);

  // Impact metrics from achievement descriptions
  const impactData = portfolioData.positions.map(position => {
    const metrics = {
      company: position.company.split(' ')[0],
      userGrowth: 0,
      teamSize: 0,
      revenue: 0,
      efficiency: 0
    };

    position.achievements.forEach(achievement => {
      const desc = achievement.description.toLowerCase();
      
      // Extract numbers and percentages
      const percentMatches = desc.match(/(\d+)%/g);
      const numberMatches = desc.match(/(\d+(?:\.\d+)?)[kmb]?\+?/gi);
      
      if (desc.includes('user') && percentMatches) {
        metrics.userGrowth = Math.max(metrics.userGrowth, parseInt(percentMatches[0]));
      }
      if (desc.includes('team') && numberMatches) {
        const teamMatch = desc.match(/(\d+)\s+designers?/);
        if (teamMatch) metrics.teamSize = parseInt(teamMatch[1]);
      }
      if (desc.includes('$') && numberMatches) {
        const revenueMatch = desc.match(/\$(\d+(?:\.\d+)?)[mb]/i);
        if (revenueMatch) {
          const value = parseFloat(revenueMatch[1]);
          metrics.revenue = revenueMatch[0].toLowerCase().includes('b') ? value * 1000 : value;
        }
      }
      if (desc.includes('reduc') && percentMatches) {
        metrics.efficiency = Math.max(metrics.efficiency, parseInt(percentMatches[0]));
      }
    });

    return metrics;
  });

  // Exit outcomes data
  const exitData = portfolioData.positions
    .filter(p => p.exit)
    .map(p => ({
      company: p.company.split(' ')[0],
      type: p.exit!.type,
      value: p.exit!.details.includes('$') ? 
        parseFloat(p.exit!.details.match(/\$(\d+(?:\.\d+)?)/)?.[1] || '0') : 0
    }));

  const chartConfig = {
    achievements: { label: "Achievements", color: "hsl(var(--primary))" },
    userGrowth: { label: "User Growth %", color: "hsl(var(--destructive))" },
    teamSize: { label: "Team Size", color: "hsl(var(--muted-foreground))" },
    revenue: { label: "Revenue ($M)", color: "hsl(var(--accent-foreground))" },
    efficiency: { label: "Efficiency %", color: "hsl(var(--secondary))" }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Experience Analytics</h1>
                <p className="text-muted-foreground">Visual breakdown of career impact and progression</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Career Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Career Timeline & Achievement Density
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="company" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="achievements" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Evolution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="skill" type="category" width={120} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="frequency" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Impact Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Impact Metrics by Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="company" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="userGrowth" 
                      stroke="hsl(var(--destructive))" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="teamSize" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Exit Outcomes */}
        {exitData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Exit Outcomes & Company Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartContainer config={chartConfig} className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={exitData.map(d => ({ name: d.type, value: 1 }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {exitData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))"} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                
                <div className="space-y-4">
                  {exitData.map((exit, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{exit.company}</p>
                        <p className="text-sm text-muted-foreground">{exit.type}</p>
                      </div>
                      {exit.value > 0 && (
                        <p className="text-lg font-bold">${exit.value}M</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Positions</p>
                  <p className="text-2xl font-bold">{portfolioData.positions.length}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">
                    {portfolioData.positions.reduce((sum, p) => sum + p.achievements.length, 0)}
                  </p>
                </div>
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Successful Exits</p>
                  <p className="text-2xl font-bold">{exitData.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unique Skills</p>
                  <p className="text-2xl font-bold">{skillsMap.size}</p>
                </div>
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Experience;
