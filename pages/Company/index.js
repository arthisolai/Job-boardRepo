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
  console.log("Received company data:", companies);
  return (
    <ContentContainer>
      {companies.map((company, index) => (
        <div key={index}>
          <h1>{company.companyName}</h1>
          <a href={company.companyURL}>Company Website</a>
          <br />
          <p>Country: {company.country}</p>
          <p>Industry: {company.industry}</p>
          <p>Founded In: {company.foundedIn}</p>
        </div>
      ))}
    </ContentContainer>
  );
}
