import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CompanyGateway } from '@/components/company/CompanyGateway';
import { companies, getCompanyBySlug } from '@/lib/data/companies';

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const company = getCompanyBySlug(params.slug);

  if (!company) {
    return {
      title: 'Company not found | VivaLaVida',
    };
  }

  return {
    title: `${company.name} | VivaLaVida`,
    description: company.proposition,
  };
}

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const company = getCompanyBySlug(params.slug);

  if (!company) {
    notFound();
  }

  return <CompanyGateway company={company} />;
}
