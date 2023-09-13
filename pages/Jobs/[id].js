import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";

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

  const handleApplyClick = () => {
    if (job.Link) {
      window.location.href = job.Link;
    }
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md space-y-4 md:space-y-8 relative">
      <div className="flex items-center">
        {/* Company Logo */}
        {job.CompanyInfo && (
          <Image
            src={job.CompanyInfo.companyLogo}
            alt={`${job.Company} Logo`}
            width={100}
            height={100}
            className="md:w-36 md:h-36"
          />
        )}
        {/* Apply Button aligned to the right of the logo */}
        <button
          onClick={handleApplyClick}
          className="ml-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
      <h1 className="text-xl md:text-3xl font-bold text-blue-600">
        {job.Position}
      </h1>
      <div className="space-y-2 md:space-y-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700">
          Company
        </h3>
        <p className="text-gray-500">{job.Company}</p>

        <h3 className="text-lg md:text-xl font-semibold text-gray-700">
          Location
        </h3>
        <p className="text-gray-500">{job.Location}</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <section className="space-y-2 md:space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">
            {job.Description.Title}
          </h3>
          <p className="text-gray-500">{job.Description.Text}</p>
        </section>

        <section className="space-y-2 md:space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">
            {job.Responsibility.Title}
          </h3>
          <ul className="list-disc list-inside space-y-1 md:space-y-2 text-gray-500">
            {job.Responsibility.Text.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-2 md:space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">
            {job.Qualification.Title}
          </h3>
          <ul className="list-disc list-inside space-y-1 md:space-y-2 text-gray-500">
            {job.Qualification.Text.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {job?.NiceToHave?.Title && (
          <section className="space-y-2 md:space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              {job.NiceToHave.Title}
            </h3>
            <ul className="list-disc list-inside space-y-1 md:space-y-2 text-gray-500">
              {job.NiceToHave.Text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {job?.PerksAndBenefits?.Title && (
          <section className="space-y-2 md:space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              {job.PerksAndBenefits.Title}
            </h3>
            <ul className="list-disc list-inside space-y-1 md:space-y-2 text-gray-500">
              {job.PerksAndBenefits.Text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <button
        onClick={handleApplyClick}
        className="block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 md:mt-8"
      >
        Apply
      </button>
    </div>
  );
}
