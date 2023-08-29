import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: job, error } = useSWR(id ? `/api/Jobs/${id}` : null, fetcher);

  if (error) return <div>Failed to load job</div>;
  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h1>{job.position}</h1>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.jobType}</p>
    </div>
  );
}
