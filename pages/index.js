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
  // const { data, error } = useSWR("/api/parity", { fallbackData: [] });
  // if (error) {
  //   console.error("Error fetching data:", error);
  //   // Handle the error, e.g., display an error message to the user
  //   return <div>Error fetching data</div>;
  // }

  // if (!data) {
  //   // Data is still loading
  //   return <div>Loading...</div>;
  // }

  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  // console.log("Received searchQuery:", searchQuery);

  // console.log("Component re-rendered");
  // Create the query string based on the current state values
  const queryString = [
    country && `Location=${country}`,
    department && `Department=${department}`,
    title && `Position=${title}`,
    company && `Company=${company}`,
    searchQuery && `query=${searchQuery}`,
  ]
    .filter(Boolean)
    .join("&");
  // console.log("Query string:", queryString);

  // Fetch data using the dynamically created query string
  const { data: jobs, error } = useSWR(`/api/Jobs?${queryString}`, fetcher);
  console.log("Jobs========*******=========", jobs);
  // console.log(`Sending request to /api/Jobs?${queryString}`);

  // const { data: jobs, error } = useSWR(
  //   `/api/Jobs?country=${country}&department=${department}&title=${title}&query=${searchQuery}`,
  //   fetcher
  // );
  const { data: filters } = useSWR("/api/JobFilters", fetcher);

  // console.log("Filters:", filters);

  // console.log("Fetched jobs:", jobs);

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
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  // const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  let currentJobs = [];
  if (Array.isArray(jobs)) {
    currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  }
  // console.log("Current jobs:", currentJobs);
  // Change page
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

        {/* <select value={country} onChange={(e) => setCountry(e.target.value) }>
         */}
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

            {/* Title Filter */}
            {/* <div className="flex flex-col mb-2 w-full sm:w-1/3">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <select
              id="title"
              className="p-2 border rounded-md w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="" disabled>
                Select Title
              </option>
              {filters.titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div> */}

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
