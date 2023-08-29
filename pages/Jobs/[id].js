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
      <h3>Company</h3>
      <p>{job.company}</p>
      <h3>Location</h3>
      <p>{job.location}</p>
      <h3>Job Type</h3>
      <p>{job.jobType}</p>
      <h3>Responsibilities</h3>
      <ul>
        {job.responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
      <h3>Qualifications</h3>
      <ul>
        {job.qualifications.map((qualification, index) => (
          <li key={index}>{qualification}</li>
        ))}
      </ul>
    </div>
  );
}
