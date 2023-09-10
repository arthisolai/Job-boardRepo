import Link from "next/link";
import useSWR from "swr";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("Failed to load data");
    console.error(await res.text());
    throw error;
  }
  return res.json();
};

export default function Company() {
  const { data: companies, error } = useSWR(`/api/Company`, fetcher);
  if (error) return <div>Failed to load company</div>;
  if (!companies) return <div>Loading...</div>;
  // console.log("Received company data:", companies);
  return (
    <ContentContainer className="space-y-6 mx-8">
      {companies.map((company, index) => (
        <div
          key={index}
          className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white"
        >
          <Link
            href={`/Company/${company._id}`}
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            <h1 className="text-xl font-bold mb-3">{company.companyName}</h1>
          </Link>
          <a
            href={company.companyURL}
            className="text-blue-500 hover:underline mb-2 block"
          >
            Company Website
          </a>
          <p className="mb-1">
            <span className="font-semibold">Country:</span> {company.country}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Industry:</span> {company.industry}
          </p>
          <p>
            <span className="font-semibold">Founded In:</span>{" "}
            {company.foundedIn}
          </p>
        </div>
      ))}
    </ContentContainer>
  );
}
