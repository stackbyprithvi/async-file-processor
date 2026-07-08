import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CircleCheckBig, CircleX, Clock3 } from "lucide-react";

export default function StatusCard({ job }) {
  if (!job) return null;

  const statusConfig = {
    queued: {
      icon: <Clock3 className="h-5 w-5 text-amber-500" />,
      badge: "Queued",
      variant: "secondary",
      description: "Waiting for worker...",
    },
    processing: {
      icon: <Loader2 className="h-5 w-5 animate-spin text-blue-500" />,
      badge: "Processing",
      variant: "default",
      description: "Your file is being processed.",
    },
    completed: {
      icon: <CircleCheckBig className="h-5 w-5 text-green-600" />,
      badge: "Completed",
      variant: "default",
      description: "Ready to download.",
    },
    failed: {
      icon: <CircleX className="h-5 w-5 text-red-500" />,
      badge: "Failed",
      variant: "destructive",
      description: "Something went wrong.",
    },
  };

  const current = statusConfig[job.status];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Status</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {current.icon}
          <div>
            <p className="font-medium">{job.fileName}</p>
            <p className="text-sm text-muted-foreground">
              {current.description}
            </p>
          </div>
        </div>{" "}
        <Badge variant={current.variant}>{current.badge}</Badge>
      </CardContent>
    </Card>
  );
}
