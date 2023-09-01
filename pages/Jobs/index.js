import Link from "next/link";
import useSWR from "swr";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function JobBoard() {
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");

  const { data: jobs, error } = useSWR(
    `/api/Jobs?country=${country}&department=${department}&title=${title}`,
    fetcher
  );
  const { data: filters } = useSWR("/api/JobFilters", fetcher);

  useEffect(() => {}, [country, department, title]);
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
              <h2>{job.position}</h2>
            </Link>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.jobType}</p>
          </div>
        ))
      ) : (
        <div>No jobs match the current filters.</div>
      )}
    </ContentContainer>
  );
}
