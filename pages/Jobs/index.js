import Link from "next/link";
import useSWR from "swr";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function JobBoard() {
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");

  const { data: jobs, error } = useSWR(
    `/api/Jobs?country=${country}&company=${company}&title=${title}`,
    fetcher
  );
  const { data: filters } = useSWR("/api/JobFilters", fetcher);

  useEffect(() => {}, [country, company, title]);

  if (error) {
    console.error("SWR error:", error);
    return <div>Error loading jobs</div>;
  }

  if (!jobs || !filters) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="" disabled>
          Select Country
        </option>
        {filters.countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select value={company} onChange={(e) => setCompany(e.target.value)}>
        <option value="" disabled>
          Select Company
        </option>
        {filters.companies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select value={title} onChange={(e) => setTitle(e.target.value)}>
        <option value="" disabled>
          Select Title
        </option>
        {filters.titles.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

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
    </div>
  );
}
