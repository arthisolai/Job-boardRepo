import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: job, error } = useSWR(id ? `/api/Jobs/${id}` : null, fetcher);

  if (error) return <div>Failed to load job</div>;
  if (!job) return <div>Loading...</div>;

  return (
    <ContentContainer>
      <h1>{job.Position}</h1>
      <h3>Company</h3>
      <p>{job.Company}</p>
      <h3>Location</h3>
      <p>{job.Location}</p>
      {/* <h3>Job Type</h3>
      <p>{job.jobType}</p> */}
      <div>
        <h3>{job.Description.Title}</h3>
        <p>{job.Description.Text}</p>

        <h3>{job.Responsibility.Title}</h3>
        <ul>
          {job.Responsibility.Text.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>{job.Qualification.Title}</h3>
        <ul>
          {job.Qualification.Text.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {job?.NiceToHave?.Title && <h3>{job.NiceToHave.Title}</h3>}
        {job?.NiceToHave?.Text && (
          <ul>
            {job.NiceToHave.Text.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

        {job?.PerksAndBenefits?.Title && <h3>{job.PerksAndBenefits.Title}</h3>}

        {job?.PerksAndBenefits?.Text && (
          <ul>
            {job.PerksAndBenefits.Text.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </ContentContainer>
  );
}
