import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, AlertTriangle, CheckCircle2, FileText, TestTube } from "lucide-react";

interface StepItem {
  id: string;
  title: string;
  completed: boolean;
  critical: boolean;
}

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed';
  items: StepItem[];
}

interface CertificationStepProps {
  step: Step;
  onItemUpdate: (stepId: string, itemId: string, completed: boolean) => void;
}

const STEP_RESOURCES: Record<string, Array<{ title: string; url: string; type: 'doc' | 'tool' | 'test' }>> = {
  performance: [
    { title: 'Performance Profiling Tools', url: '#', type: 'tool' },
    { title: 'Valgrind Memory Analysis', url: '#', type: 'tool' },
    { title: 'Benchmark Testing Guide', url: '#', type: 'doc' },
    { title: 'Thermal Management Best Practices', url: '#', type: 'doc' },
  ],
  'ux-ui': [
    { title: 'Netflix UI/UX Guidelines', url: '#', type: 'doc' },
    { title: 'Accessibility Testing Checklist', url: '#', type: 'test' },
    { title: 'Brand Guidelines', url: '#', type: 'doc' },
  ],
  security: [
    { title: 'Widevine DRM SDK', url: '#', type: 'tool' },
    { title: 'Security Audit Checklist', url: '#', type: 'test' },
    { title: 'DRM Integration Guide', url: '#', type: 'doc' },
  ],
  technical: [
    { title: 'Codec Validation Tools', url: '#', type: 'tool' },
    { title: 'HDR Testing Suite', url: '#', type: 'test' },
    { title: 'Network Optimization Guide', url: '#', type: 'doc' },
  ],
  network: [
    { title: 'Network Emulation Tools', url: '#', type: 'tool' },
    { title: 'Throughput Monitoring Guide', url: '#', type: 'doc' },
    { title: 'Connection Stability Tests', url: '#', type: 'test' },
  ],
};

const STEP_ACTIONABLE_STEPS: Record<string, string[]> = {
  performance: [
    'Use performance profiling tools (e.g., custom scripts, industry-standard benchmarks for embedded Linux) to measure app launch times, UI frame rates, and CPU/GPU utilization.',
    'Implement efficient memory allocation and garbage collection to prevent slowdowns. Tools like valgrind (for Linux) can help identify memory leaks.',
    'Ensure your device\'s cooling system can handle sustained high-performance demands without throttling. Monitor temperatures during stress tests.',
  ],
  'ux-ui': [
    'Conduct thorough manual testing against Netflix\'s latest UI guidelines (usually provided in partner documentation). Pay attention to navigation flows, visual consistency, and responsiveness.',
    'Ensure the app is accessible to users with disabilities (e.g., screen reader compatibility, proper focus management).',
  ],
  security: [
    'Utilize Netflix-provided DRM SDKs and validation tools to ensure correct implementation and secure key ladders.',
    'Engage with third-party security firms or internal security teams to conduct penetration testing and vulnerability assessments.',
    'Implement mechanisms to verify firmware authenticity and prevent unauthorized modifications.',
  ],
  technical: [
    'Use media analysis tools (e.g., ffmpeg, custom decoders) to verify correct decoding and rendering of various Netflix content streams.',
    'Test HDR content playback on a calibrated display to ensure accurate color reproduction and dynamic range.',
    'Optimize your Linux network stack for efficient streaming, including TCP/IP tuning and buffer management.',
  ],
  network: [
    'Use network simulation tools (e.g., netem on Linux) to test performance under various network conditions (low bandwidth, high latency, packet loss).',
    'Monitor network throughput and buffer levels during streaming to identify bottlenecks.',
  ],
};

export function CertificationStep({ step, onItemUpdate }: CertificationStepProps) {
  const progress = (step.items.filter(item => item.completed).length / step.items.length) * 100;
  const criticalItems = step.items.filter(item => item.critical);
  const nonCriticalItems = step.items.filter(item => !item.critical);
  const resources = STEP_RESOURCES[step.id] || [];
  const actionableSteps = STEP_ACTIONABLE_STEPS[step.id] || [];

  const getResourceIcon = (type: 'doc' | 'tool' | 'test') => {
    switch (type) {
      case 'doc': return <FileText className="h-4 w-4" />;
      case 'tool': return <TestTube className="h-4 w-4" />;
      case 'test': return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="text-primary">{step.icon}</div>
            <div className="flex-1">
              <CardTitle className="text-xl">{step.title}</CardTitle>
              <CardDescription className="mt-1">{step.description}</CardDescription>
            </div>
            <Badge 
              variant={progress === 100 ? "default" : progress > 0 ? "secondary" : "outline"}
              className="px-3 py-1"
            >
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Requirements Checklist</CardTitle>
            <CardDescription>
              Complete all critical items to proceed with certification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Critical Items */}
            {criticalItems.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <h4 className="font-medium text-sm text-foreground">Critical Requirements</h4>
                </div>
                <div className="space-y-3">
                  {criticalItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={(checked) => 
                          onItemUpdate(step.id, item.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={item.id}
                        className={`flex-1 text-sm cursor-pointer ${
                          item.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {item.title}
                      </label>
                      <Badge variant="destructive">
                        Critical
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Non-Critical Items */}
            {nonCriticalItems.length > 0 && (
              <div>
                {criticalItems.length > 0 && <Separator className="my-4" />}
                <h4 className="font-medium text-sm text-foreground mb-3">
                  Additional Requirements
                </h4>
                <div className="space-y-3">
                  {nonCriticalItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card">
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={(checked) => 
                          onItemUpdate(step.id, item.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={item.id}
                        className={`flex-1 text-sm cursor-pointer ${
                          item.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resources & Actions */}
        <div className="space-y-6">
          {/* Actionable Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actionable Steps & Tools</CardTitle>
              <CardDescription>
                Follow these steps to complete the requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionableSteps.map((stepText, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{stepText}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          {resources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resources & Documentation</CardTitle>
                <CardDescription>
                  Helpful tools and documentation for this step
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-3"
                      asChild
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center space-x-3 w-full">
                          <div className="text-muted-foreground">
                            {getResourceIcon(resource.type)}
                          </div>
                          <span className="flex-1 text-left">{resource.title}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}