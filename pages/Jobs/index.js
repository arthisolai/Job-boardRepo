import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function JobBoard() {
  const { data: jobs, error } = useSWR("/api/Jobs", fetcher);

  if (error) {
    console.error("SWR error:", error);
    return <div>Error loading jobs</div>;
  }

  if (!jobs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {jobs?.map((job) => (
        <div key={job._id}>
          <Link href={`/Jobs/${job._id}`}>
            <h2>{job.position}</h2>
          </Link>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.jobType}</p>
        </div>
      ))}
    </div>
  );
}
