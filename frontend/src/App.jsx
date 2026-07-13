import { useState, useEffect } from "react";
import UploadCard from "./components/UploadCard";
import JobStatus from "./components/StatusCard";
import { socket } from "@/socket/socket";
import Login from "./components/Login";
import AuthCallback from "./components/AuthCallback";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [job, setJob] = useState(null);

  const isCallback = window.location.search.includes("token=");

  useEffect(() => {
    const handleJobUpdate = (updatedJob) => {
      console.log("JOB UPDATE:", updatedJob);
      setJob(updatedJob);
    };

    socket.on("jobUpdate", handleJobUpdate);

    return () => {
      socket.off("jobUpdate", handleJobUpdate);
    };
  }, []);

  if (isCallback) {
    return <AuthCallback onAuth={setToken} />;
  }

  if (!token) {
    return <Login />;
  }

  return (
    <main className="mx-auto mt-16 max-w-xl space-y-6">
      <UploadCard setJob={setJob} />
      <JobStatus job={job} />
    </main>
  );
}

export default App;
