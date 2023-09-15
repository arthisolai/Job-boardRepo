import useSWR from "swr";
import styled from "styled-components";
import EmailForm from "../Components/EmailForm/EmailForm";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home({ searchQuery }) {
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const queryString = [
    country && `Location=${country}`,
    department && `Department=${department}`,
    title && `Position=${title}`,
    company && `Company=${company}`,
    searchQuery && `query=${searchQuery}`,
    `currentPage=${currentPage}`,
    `jobsPerPage=${jobsPerPage}`,
  ]
    .filter(Boolean)
    .join("&");

  const { data: jobsData, error } = useSWR(`/api/Jobs?${queryString}`, fetcher);
  console.log("Jobs========*******=========", jobsData);

  const jobs = jobsData ? jobsData.jobs : null;
  const totalJobs = jobsData ? jobsData.totalJobs : 0;

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const { data: filters } = useSWR("/api/JobFilters", fetcher);

  useEffect(() => {
    console.log("useEffect triggered", country, department, title, searchQuery);
    console.log("Fetching data with searchQuery:", searchQuery);
    setCurrentPage(1);
  }, [country, department, title, searchQuery]);
  const resetFilters = () => {
    setCountry("");
    setDepartment("");
    setTitle("");
  };

  if (error) {
    console.error("SWR error:", error);
    return <div>Error loading jobs</div>;
  }

  if (!jobs || !filters) {
    return <div>Loading...</div>;
  }

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = jobs;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <ContentContainer>
        <div className="text-center font-sans">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get Global with Your Tech Career
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 mx-4 md:mx-8 lg:mx-16">
            Find Tech Roles Offering Visa & Relocation Support, Explore 150
            Curated Tech Jobs from 10 Diverse Countries Across the Globe
          </h2>
        </div>

        <div className="flex justify-center w-full mt-8 mb-8">
          <div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow">
            {/* Country Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="country"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <select
                id="country"
                className="p-2 border rounded-md appearance-none"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  console.log("Country selected:", e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Country
                </option>
                {filters.countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="department"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <select
                id="department"
                className="p-2 border rounded-md appearance-none"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="" disabled>
                  Select Department
                </option>
                {filters.departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1 invisible">
                Placeholder
              </span>
              <button
                onClick={resetFilters}
                className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {currentJobs.map((job) => (
            <div
              key={job._id}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white space-y-2 max-w-x1 mx-8"
            >
              <Link
                href={`/Jobs/${job._id}`}
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                {/* Render the company logo */}
                {job.CompanyInfo && (
                  <Image
                    src={job.CompanyInfo.companyLogo}
                    alt={`${job.Company} Logo`}
                    width={50}
                    height={50}
                  />
                )}
                <h2 className="font-bold">{job.Position}</h2>
              </Link>
              <p>{job.Company}</p>
              <p>{job.Location}</p>
              {/* <p>{job.jobType}</p> */}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              currentPage === 1 ? "cursor-not-allowed bg-gray-300" : ""
            }`}
          >
            Previous
          </button>
          <span className="text-lg">
            {!isNaN(totalPages)
              ? `Page ${currentPage} of ${totalPages}`
              : "Loading..."}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              currentPage === totalPages ? "cursor-not-allowed bg-gray-300" : ""
            }`}
          >
            Next
          </button>
        </div>
        <EmailForm />
      </ContentContainer>
    </>
  );
}
