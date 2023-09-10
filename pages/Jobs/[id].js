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
    <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">{job.Position}</h1>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Company</h3>
        <p className="text-gray-500">{job.Company}</p>

        <h3 className="text-xl font-semibold text-gray-700">Location</h3>
        <p className="text-gray-500">{job.Location}</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">
            {job.Description.Title}
          </h3>
          <p className="text-gray-500">{job.Description.Text}</p>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">
            {job.Responsibility.Title}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            {job.Responsibility.Text.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">
            {job.Qualification.Title}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            {job.Qualification.Text.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {job?.NiceToHave?.Title && (
          <section className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">
              {job.NiceToHave.Title}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-500">
              {job.NiceToHave.Text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {job?.PerksAndBenefits?.Title && (
          <section className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">
              {job.PerksAndBenefits.Title}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-500">
              {job.PerksAndBenefits.Text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
