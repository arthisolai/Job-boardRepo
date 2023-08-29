import { useRouter } from "next/router";
import useSWR from "swr";
import { ListItem, List } from "next/components";

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
      <List>
        {job.responsibilities.map((responsibility, index) => (
          <ListItem key={index}>{responsibility}</ListItem>
        ))}
      </List>
      <List>
        {job.qualifications.map((qualification, index) => (
          <ListItem key={index}>{qualification}</ListItem>
        ))}
      </List>
    </div>
  );
}
