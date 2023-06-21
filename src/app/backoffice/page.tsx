'use client';

import PageHeader from './components/PageHeader/PageHeader';

export default function Home() {
  return (
    <div>
      <PageHeader>
        <PageHeader.Title>נסיעות פעילות</PageHeader.Title>
        <PageHeader.ActionButton>צריך למחוק</PageHeader.ActionButton>
      </PageHeader>
    </div>
  );
}
