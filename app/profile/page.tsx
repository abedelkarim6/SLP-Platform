import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Edit, Upload, Download, Award, BookOpen, Calendar } from "lucide-react"

export default function TherapistProfile() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Therapist Profile</h1>
          <p className="text-muted-foreground">Manage your professional profile and development goals</p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-xl">SJ</AvatarFallback>
                <AvatarImage src={`/placeholder.svg?height=96&width=96`} />
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">Dr. Sarah Johnson</h2>
                <p className="text-muted-foreground">Speech-Language Pathologist</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge>CCC-SLP</Badge>
                <Badge variant="outline">10+ Years Experience</Badge>
              </div>
              <div className="grid w-full grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium">Contact Information</h3>
                <p className="text-sm">sarah.johnson@example.com</p>
                <p className="text-sm">(555) 987-6543</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Office Location</h3>
                <p className="text-sm">Speech Therapy Center</p>
                <p className="text-sm">456 Health Blvd, Anytown, USA</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Specializations</h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge variant="outline">Articulation Disorders</Badge>
                  <Badge variant="outline">Language Delays</Badge>
                  <Badge variant="outline">Fluency Disorders</Badge>
                  <Badge variant="outline">Pediatric Therapy</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs defaultValue="goals">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="goals">Professional Goals</TabsTrigger>
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="goals">
              <TabsContent value="goals" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Short-term Goals</h3>
                  <div className="mt-2 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Complete Advanced Fluency Workshop</span>
                          <Badge>In Progress</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">Due: May 30, 2023</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Develop New Assessment Protocol</span>
                          <Badge>In Progress</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">Due: June 15, 2023</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Implement New Therapy Techniques</span>
                          <Badge variant="outline">Planned</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">Due: July 1, 2023</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Long-term Goals</h3>
                  <div className="mt-2 space-y-4">
                    <div className="rounded-lg border p-3">
                      <h4 className="font-medium">Obtain Board Certification in Fluency Disorders</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete required coursework and clinical hours by December 2023.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="font-medium">Develop Specialized Therapy Program</h4>
                      <p className="text-sm text-muted-foreground">
                        Create a comprehensive program for children with complex articulation disorders by March 2024.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="font-medium">Publish Research on Therapy Outcomes</h4>
                      <p className="text-sm text-muted-foreground">
                        Collect data and publish findings on therapy outcomes for articulation disorders by June 2024.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="strengths" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Clinical Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Articulation Therapy</span>
                            <span className="text-sm font-medium">Expert</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Language Intervention</span>
                            <span className="text-sm font-medium">Advanced</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Fluency Therapy</span>
                            <span className="text-sm font-medium">Intermediate</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Voice Therapy</span>
                            <span className="text-sm font-medium">Intermediate</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Professional Attributes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Patient Rapport</span>
                            <span className="text-sm font-medium">Excellent</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Documentation</span>
                            <span className="text-sm font-medium">Very Good</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Parent Counseling</span>
                            <span className="text-sm font-medium">Excellent</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Team Collaboration</span>
                            <span className="text-sm font-medium">Very Good</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications & Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Award className="mt-0.5 h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Certificate of Clinical Competence (CCC-SLP)</h4>
                          <p className="text-sm text-muted-foreground">
                            American Speech-Language-Hearing Association (ASHA)
                          </p>
                          <p className="text-sm text-muted-foreground">Issued: June 2013</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="mt-0.5 h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Advanced Training in Pediatric Articulation Disorders</h4>
                          <p className="text-sm text-muted-foreground">National Speech Therapy Institute</p>
                          <p className="text-sm text-muted-foreground">Completed: March 2018</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="mt-0.5 h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Excellence in Therapy Award</h4>
                          <p className="text-sm text-muted-foreground">
                            Regional Speech-Language Pathology Association
                          </p>
                          <p className="text-sm text-muted-foreground">Received: November 2021</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="development" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Development</CardTitle>
                    <CardDescription>Track your continuing education and skill development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Areas for Growth</h3>
                        <div className="mt-2 space-y-2">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Voice Disorders</span>
                              <span className="text-sm text-muted-foreground">Current Focus</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Augmentative and Alternative Communication (AAC)</span>
                              <span className="text-sm text-muted-foreground">Planned</span>
                            </div>
                            <Progress value={20} className="h-2" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Research Methodology</span>
                              <span className="text-sm text-muted-foreground">In Progress</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium">Upcoming Courses</h3>
                        <div className="mt-2 space-y-4">
                          <div className="flex items-start gap-3 rounded-lg border p-3">
                            <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium">Advanced Voice Therapy Techniques</h4>
                              <p className="text-sm text-muted-foreground">Online course - 10 CEU credits</p>
                              <div className="mt-1 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Starting May 15, 2023</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 rounded-lg border p-3">
                            <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium">Research Design for Speech-Language Pathologists</h4>
                              <p className="text-sm text-muted-foreground">Virtual workshop - 8 CEU credits</p>
                              <div className="mt-1 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">June 10-11, 2023</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 rounded-lg border p-3">
                            <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium">AAC Implementation Strategies</h4>
                              <p className="text-sm text-muted-foreground">In-person conference - 15 CEU credits</p>
                              <div className="mt-1 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">September 22-24, 2023</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
