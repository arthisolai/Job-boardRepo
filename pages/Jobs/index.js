import Link from "next/link";
import useSWR from "swr";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function JobBoard({ searchQuery }) {
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  // console.log("Received Search Query:", searchQuery);

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

  // Fetch data using the dynamically created query string
  const { data: jobs, error } = useSWR(`/api/Jobs?${queryString}`, fetcher);

  // console.log(`Sending request to /api/Jobs?${queryString}`);

  // const { data: jobs, error } = useSWR(
  //   `/api/Jobs?country=${country}&department=${department}&title=${title}&query=${searchQuery}`,
  //   fetcher
  // );
  const { data: filters } = useSWR("/api/JobFilters", fetcher);

  useEffect(() => {}, [country, department, title, searchQuery]);
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

  return (
    <ContentContainer>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="" disabled>
          Select Country
        </option>
        {filters.countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
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

      <select value={title} onChange={(e) => setTitle(e.target.value)}>
        <option value="" disabled>
          Select Title
        </option>
        {filters.titles.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
      <button onClick={resetFilters}>Reset Filters</button>
      {Array.isArray(jobs) ? (
        jobs.map((job) => (
          <div key={job._id}>
            <Link href={`/Jobs/${job._id}`}>
              <h2>{job.Position}</h2>
            </Link>
            <p>{job.Company}</p>
            <p>{job.Location}</p>
            {/* <p>{job.jobType}</p> */}
          </div>
        ))
      ) : (
        <div>No jobs match the current filters.</div>
      )}
    </ContentContainer>
  );
}
