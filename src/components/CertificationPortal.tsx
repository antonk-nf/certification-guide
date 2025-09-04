import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Clock, FileText, TestTube, Shield, Cpu, Wifi, Users } from "lucide-react";
import { CertificationStep } from "./CertificationStep";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed';
  items: {
    id: string;
    title: string;
    completed: boolean;
    critical: boolean;
  }[];
}

const CERTIFICATION_STEPS: Step[] = [
  {
    id: 'performance',
    title: 'Performance & Responsiveness',
    description: 'Ensure fast app launch, smooth navigation, and sustained performance',
    icon: <Cpu className="h-6 w-6" />,
    status: 'pending',
    items: [
      { id: 'app-launch', title: 'Fast App Launch (< 3 seconds)', completed: false, critical: true },
      { id: 'ui-navigation', title: 'Snappy UI Navigation', completed: false, critical: true },
      { id: 'playback-start', title: 'Quick Playback Start', completed: false, critical: true },
      { id: 'sustained-performance', title: 'Sustained Performance (4K HDR)', completed: false, critical: true },
      { id: 'benchmark-testing', title: 'Benchmark Testing Complete', completed: false, critical: false },
      { id: 'memory-management', title: 'Memory Management Optimized', completed: false, critical: false },
      { id: 'thermal-testing', title: 'Thermal Management Tested', completed: false, critical: false },
    ]
  },
  {
    id: 'ux-ui',
    title: 'User Experience & UI Compliance',
    description: 'Adhere to Netflix UI/UX guidelines for consistent brand experience',
    icon: <Users className="h-6 w-6" />,
    status: 'pending',
    items: [
      { id: 'netflix-button', title: 'Netflix Button Integration', completed: false, critical: true },
      { id: 'app-discoverability', title: 'App Discoverability', completed: false, critical: true },
      { id: 'branding-accuracy', title: 'Branding Accuracy', completed: false, critical: true },
      { id: 'ui-ux-review', title: 'UI/UX Manual Testing', completed: false, critical: false },
      { id: 'accessibility-testing', title: 'Accessibility Testing', completed: false, critical: false },
    ]
  },
  {
    id: 'security',
    title: 'Security & Content Protection (DRM)',
    description: 'Implement robust security measures for content protection',
    icon: <Shield className="h-6 w-6" />,
    status: 'pending',
    items: [
      { id: 'widevine-drm', title: 'Widevine L1 DRM Implementation', completed: false, critical: true },
      { id: 'hdcp', title: 'HDCP 2.2 Implementation', completed: false, critical: true },
      { id: 'secure-boot', title: 'Secure Boot & TEE', completed: false, critical: true },
      { id: 'drm-integration', title: 'DRM Integration Kits', completed: false, critical: false },
      { id: 'security-audits', title: 'Security Audits', completed: false, critical: false },
      { id: 'firmware-integrity', title: 'Firmware Integrity Checks', completed: false, critical: false },
    ]
  },
  {
    id: 'technical',
    title: 'Technical Specifications',
    description: 'Support necessary codecs and formats for optimal streaming',
    icon: <TestTube className="h-6 w-6" />,
    status: 'pending',
    items: [
      { id: 'video-codecs', title: 'H.264/H.265 Codec Support', completed: false, critical: true },
      { id: 'audio-codecs', title: 'Dolby Audio Support', completed: false, critical: true },
      { id: 'hdr-support', title: 'HDR Standards Support', completed: false, critical: true },
      { id: 'codec-testing', title: 'Codec Testing Complete', completed: false, critical: false },
      { id: 'hdr-validation', title: 'HDR Validation', completed: false, critical: false },
      { id: 'network-optimization', title: 'Network Stack Optimization', completed: false, critical: false },
    ]
  },
  {
    id: 'network',
    title: 'Network Connectivity & Stability',
    description: 'Ensure robust and stable internet connection handling',
    icon: <Wifi className="h-6 w-6" />,
    status: 'pending',
    items: [
      { id: 'wifi-ethernet', title: 'Wi-Fi/Ethernet Performance', completed: false, critical: true },
      { id: 'adaptive-streaming', title: 'Adaptive Bitrate Streaming', completed: false, critical: true },
      { id: 'network-emulation', title: 'Network Emulation Testing', completed: false, critical: false },
      { id: 'throughput-monitoring', title: 'Throughput Monitoring', completed: false, critical: false },
    ]
  }
];

export function CertificationPortal() {
  const [steps, setSteps] = useState<Step[]>(CERTIFICATION_STEPS);
  const [selectedStep, setSelectedStep] = useState<string>('performance');

  const updateStepItem = (stepId: string, itemId: string, completed: boolean) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId 
          ? {
              ...step,
              items: step.items.map(item => 
                item.id === itemId ? { ...item, completed } : item
              )
            }
          : step
      )
    );
  };

  const getStepProgress = (step: Step) => {
    const completed = step.items.filter(item => item.completed).length;
    return (completed / step.items.length) * 100;
  };

  const getOverallProgress = () => {
    const totalItems = steps.reduce((acc, step) => acc + step.items.length, 0);
    const completedItems = steps.reduce((acc, step) => 
      acc + step.items.filter(item => item.completed).length, 0
    );
    return (completedItems / totalItems) * 100;
  };

  const selectedStepData = steps.find(step => step.id === selectedStep);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-primary">NETFLIX</div>
              <div className="text-lg text-muted-foreground">Smart TV Certification Portal</div>
            </div>
            <Badge variant="secondary" className="text-sm">
              Linux-based Systems
            </Badge>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">Overall Progress</h2>
              <span className="text-sm text-muted-foreground">
                {Math.round(getOverallProgress())}% Complete
              </span>
            </div>
            <Progress value={getOverallProgress()} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Certification Steps</span>
                </CardTitle>
                <CardDescription>
                  Complete all steps to achieve Netflix certification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {steps.map((step) => {
                  const progress = getStepProgress(step);
                  const isSelected = selectedStep === step.id;
                  
                  return (
                    <div
                      key={step.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border bg-card hover:bg-accent'
                      }`}
                      onClick={() => setSelectedStep(step.id)}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-foreground">{step.title}</h3>
                        </div>
                        <div className="flex items-center space-x-1">
                          {progress === 100 ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : progress > 0 ? (
                            <Clock className="h-4 w-4 text-warning" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      <div className="mb-2">
                        <Progress value={progress} className="h-1" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {step.items.filter(item => item.completed).length} of {step.items.length} completed
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Selected Step Details */}
          <div className="lg:col-span-2">
            {selectedStepData && (
              <CertificationStep
                step={selectedStepData}
                onItemUpdate={updateStepItem}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}