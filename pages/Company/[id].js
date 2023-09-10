import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";

const ContentContainer = styled.div`
  /* margin-top: 80px; */
`;

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CompanyDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: company, error } = useSWR(
    id ? `/api/Company/${id}` : null,
    fetcher
  );

  const { data: jobs, error: jobsError } = useSWR(
    id ? `/api/Jobs?company=${id}` : null,
    fetcher
  );

  const filteredJobs =
    jobs && company
      ? jobs.filter((job) => job.Company === company.companyName)
      : [];

  if (error) return <div>Failed to load</div>;
  if (!company) return <div>Loading...</div>;
  // console.log(company);

  return (
    <ContentContainer className="flex flex-col items-center w-full mx-auto px-3 md:px-6 lg:px-8 space-y-6 overflow-x-hidden max-w-screen-xl">
      {/* Company details on top */}
      <div className="self-center space-y-3 w-full mx-2 p-5 rounded-md bg-gray-50 border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">{company.companyName}</h1>
        <div className="flex space-x-3 mb-3">
          <a
            href={company.companyURL}
            className="text-blue-600 hover:underline"
          >
            Company Website
          </a>
          <a
            href={company.careersURL}
            className="text-blue-600 hover:underline"
          >
            Career Website
          </a>
        </div>
        <p className="font-medium">About Company:</p>
        <p>{company.aboutCompany}</p>
        <p>
          <span className="font-medium">Country:</span> {company.country}
        </p>
        <p>
          <span className="font-medium">City:</span> {company.city}
        </p>
        <p>
          <span className="font-medium">Company Size:</span>{" "}
          {company.companySize}
        </p>
        <p>
          <span className="font-medium">Industry:</span> {company.industry}
        </p>
        <p>
          <span className="font-medium">Founded In:</span> {company.foundedIn}
        </p>
      </div>
      {/* Job listings below */}
      <div className="w-full mt-10">
        <h2 className="text-2xl font-medium text-left mb-5">
          Jobs at {company.companyName}
        </h2>

        {jobs ? (
          Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white space-y-2"
                >
                  <Link
                    href={`/Jobs/${job._id}`}
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                  >
                    <h2 className="font-bold">{job.Position}</h2>
                  </Link>
                  <p>{job.Company}</p>
                  <p>{job.Location}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-medium">No jobs available.</div>
          )
        ) : (
          <div className="text-center font-medium">Loading jobs...</div>
        )}
      </div>
    </ContentContainer>
  );
}
