import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb, TrendingUp, Users, Filter, Download, ThumbsUp, ThumbsDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PatientTrendsChart } from "@/components/patient-trends-chart"
import { DisorderDistributionChart } from "@/components/disorder-distribution-chart"

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">AI-powered analysis and recommendations for your practice</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Brain className="mr-2 h-4 w-4" />
            Generate New Insights
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Insights</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Patients Analyzed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">90% of total patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recommendations Applied</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">64% implementation rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Improvement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <p className="text-xs text-muted-foreground">+3% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by Disorder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Disorders</SelectItem>
              <SelectItem value="articulation">Articulation</SelectItem>
              <SelectItem value="language">Language Delay</SelectItem>
              <SelectItem value="fluency">Fluency</SelectItem>
              <SelectItem value="phonological">Phonological</SelectItem>
              <SelectItem value="voice">Voice</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by Age Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="0-5">0-5 years</SelectItem>
              <SelectItem value="6-12">6-12 years</SelectItem>
              <SelectItem value="13-18">13-18 years</SelectItem>
              <SelectItem value="19+">19+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select defaultValue="recent">
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="confidence">Highest Confidence</SelectItem>
              <SelectItem value="impact">Highest Impact</SelectItem>
              <SelectItem value="applied">Applied Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="trends">Trends & Patterns</TabsTrigger>
          <TabsTrigger value="activities">Suggested Activities</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Recommendations</CardTitle>
              <CardDescription>AI-generated recommendations based on session data analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">
                          {i === 1 && "Increase complexity for /s/ sound practice"}
                          {i === 2 && "Incorporate visual feedback for /r/ sound"}
                          {i === 3 && "Implement structured home practice routine"}
                          {i === 4 && "Focus on minimal pairs for phonological disorder"}
                          {i === 5 && "Adjust session frequency for optimal progress"}
                        </h3>
                      </div>
                      <Badge variant="outline">
                        {i === 1 && "Practice Adjustment"}
                        {i === 2 && "Technique Suggestion"}
                        {i === 3 && "Engagement Strategy"}
                        {i === 4 && "Focus Area"}
                        {i === 5 && "Schedule Optimization"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      {i === 1 &&
                        "Based on consistent 75% accuracy with /s/ sounds in words, consider advancing to more complex sentence-level practice with /s/ blends."}
                      {i === 2 &&
                        "Analysis of session notes indicates that patients respond well to visual cues. Consider using mirror work and visual feedback apps to improve /r/ sound production."}
                      {i === 3 &&
                        "Homework completion has been inconsistent across multiple patients. Consider implementing a structured routine with clear guidelines and digital reminders."}
                      {i === 4 &&
                        "Session data shows confusion between similar sounds. Recommend focused practice with minimal pairs to improve discrimination."}
                      {i === 5 &&
                        "Analysis of progress data suggests that twice-weekly sessions for 4 weeks followed by weekly maintenance would optimize outcomes for fluency disorders."}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`
                            ${i === 1 || i === 3 ? "border-green-200 bg-green-100 text-green-800" : ""}
                            ${i === 2 || i === 5 ? "border-yellow-200 bg-yellow-100 text-yellow-800" : ""}
                            ${i === 4 ? "border-blue-200 bg-blue-100 text-blue-800" : ""}
                          `}
                        >
                          {i === 1 || i === 3 ? "High confidence" : ""}
                          {i === 2 || i === 5 ? "Medium confidence" : ""}
                          {i === 4 ? "Applied successfully" : ""}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Generated on April {16 - i}, 2023</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" title="Helpful">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Not Helpful">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Progress Trends</CardTitle>
                <CardDescription>Average improvement rates by disorder type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PatientTrendsChart />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Disorder Distribution</CardTitle>
                <CardDescription>Current distribution of disorders in your practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DisorderDistributionChart />
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>AI-detected patterns and trends in your practice data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Articulation Therapy Effectiveness</h3>
                  </div>
                  <p className="mt-2 text-sm">
                    Patients receiving twice-weekly articulation therapy show 23% faster improvement compared to
                    once-weekly sessions. Consider adjusting scheduling for patients with articulation disorders.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Age-Related Progress Patterns</h3>
                  </div>
                  <p className="mt-2 text-sm">
                    Children aged 6-8 show the most rapid progress in phonological disorders, while children 9-12
                    respond better to metacognitive approaches for language disorders.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Seasonal Attendance Patterns</h3>
                  </div>
                  <p className="mt-2 text-sm">
                    Attendance rates drop by 15% during summer months and school holidays. Consider implementing a
                    modified schedule or telehealth options during these periods to maintain progress.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Parent Involvement Correlation</h3>
                  </div>
                  <p className="mt-2 text-sm">
                    Patients with high parent involvement in home practice show 30% better outcomes. Consider enhancing
                    parent training and communication strategies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Activities</CardTitle>
              <CardDescription>
                AI-generated activities based on patient needs and evidence-based practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Story Retelling with Target Sounds</h3>
                    <Badge>Articulation</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Read a short story containing multiple target sounds, then have the patient retell the story in
                    their own words, focusing on correct pronunciation.
                  </p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Materials Needed:</h4>
                    <ul className="ml-5 list-disc text-sm">
                      <li>Age-appropriate storybooks with target sounds</li>
                      <li>Visual cue cards for target sounds</li>
                      <li>Recording device (optional)</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Recommended For:</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="outline">Ages 6-12</Badge>
                      <Badge variant="outline">Articulation Disorders</Badge>
                      <Badge variant="outline">Phonological Disorders</Badge>
                    </div>
                  </div>
                  <Button variant="link" className="mt-2 px-0">
                    View Full Activity Details
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Conversation Mapping</h3>
                    <Badge>Language</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Create visual conversation maps to help patients understand turn-taking, topic maintenance, and
                    appropriate responses in social interactions.
                  </p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Materials Needed:</h4>
                    <ul className="ml-5 list-disc text-sm">
                      <li>Large paper or whiteboard</li>
                      <li>Colored markers</li>
                      <li>Topic cards</li>
                      <li>Visual cue cards for conversation skills</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Recommended For:</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="outline">Ages 8-16</Badge>
                      <Badge variant="outline">Language Disorders</Badge>
                      <Badge variant="outline">Social Communication</Badge>
                    </div>
                  </div>
                  <Button variant="link" className="mt-2 px-0">
                    View Full Activity Details
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Rhythm and Rate Control Games</h3>
                    <Badge>Fluency</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Use rhythm instruments, metronomes, and movement activities to help patients develop control over
                    speech rate and rhythm for improved fluency.
                  </p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Materials Needed:</h4>
                    <ul className="ml-5 list-disc text-sm">
                      <li>Metronome or rhythm app</li>
                      <li>Simple percussion instruments</li>
                      <li>Graded reading materials</li>
                      <li>Movement activity cards</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Recommended For:</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="outline">Ages 7-18</Badge>
                      <Badge variant="outline">Fluency Disorders</Badge>
                      <Badge variant="outline">Cluttering</Badge>
                    </div>
                  </div>
                  <Button variant="link" className="mt-2 px-0">
                    View Full Activity Details
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Minimal Pair Card Game</h3>
                    <Badge>Phonological</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Play a matching game with cards featuring minimal pairs (e.g., "red/wed", "cap/cat"). Patients must
                    correctly pronounce each word to make a match.
                  </p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Materials Needed:</h4>
                    <ul className="ml-5 list-disc text-sm">
                      <li>Minimal pair picture cards</li>
                      <li>Word list for target sound contrasts</li>
                      <li>Visual cue cards for articulation placement</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Recommended For:</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="outline">Ages 4-10</Badge>
                      <Badge variant="outline">Phonological Disorders</Badge>
                      <Badge variant="outline">Articulation Disorders</Badge>
                    </div>
                  </div>
                  <Button variant="link" className="mt-2 px-0">
                    View Full Activity Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
