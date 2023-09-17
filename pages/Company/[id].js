import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const ContentContainer = styled.div`
  /* margin-top: 80px; */
`;

const fetcher = (url) => fetch(url).then((r) => r.json());
const defaultPage = 1;
const defaultJobsPerPage = 10; // or any other value you prefer

export default function CompanyDetails() {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const router = useRouter();
  const { id } = router.query;

  const { data: company, error } = useSWR(
    id ? `/api/Company/${id}` : null,
    fetcher
  );

  const { data: jobs, error: jobsError } = useSWR(
    id
      ? `/api/Jobs?company=${id}&currentPage=${currentPage}&jobsPerPage=${defaultJobsPerPage}`
      : null,
    fetcher
  );

  console.log("Jobs data:", jobs);

  const filteredJobs = jobs?.jobs || [];

  console.log("filteredJobs length:", filteredJobs.length);

  if (jobsError) return <div>Error loading jobs</div>;

  if (error) return <div>Failed to load</div>;
  if (!company) return <div>Loading...</div>;
  // console.log(company);

  const totalPages = Math.ceil(jobs?.totalJobs / defaultJobsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage <= 0) return; // Don't allow pages less than 1
    if (newPage > Math.ceil(totalPages)) return; // Don't go past the total number of pages
    setCurrentPage(newPage);
  };

  return (
    <ContentContainer className="flex flex-col items-center w-full mx-auto px-3 md:px-6 lg:px-8 space-y-6 overflow-x-hidden max-w-screen-xl">
      {/* Company details on top */}
      <div className="self-center space-y-3 w-full mx-2 p-5 rounded-md bg-gray-50 border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative w-32 h-24 rounded-full overflow-hidden">
            <Image
              src={
                company.companyLogo.startsWith("data:")
                  ? company.companyLogo
                  : `data:image/png;base64,${company.companyLogo}`
              }
              alt={`${company.companyName} logo`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>
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
          </div>
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
                    {/* Company Logo */}
                    {job.CompanyInfo && (
                      <div>
                        <Image
                          src={job.CompanyInfo.companyLogo}
                          alt={`${job.Company} Logo`}
                          width={24}
                          height={16}
                          className="md:w-24 md:h-16"
                        />
                      </div>
                    )}
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
      <div className="flex items-center justify-center space-x-4 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            currentPage === 1 ? "cursor-not-allowed bg-gray-300" : ""
          }`}
        >
          Previous
        </button>
        <span className="text-lg">
          {totalPages ? `Page ${currentPage} of ${totalPages}` : "Loading..."}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            currentPage === totalPages ? "cursor-not-allowed bg-gray-300" : ""
          }`}
        >
          Next
        </button>
      </div>
    </ContentContainer>
  );
}
