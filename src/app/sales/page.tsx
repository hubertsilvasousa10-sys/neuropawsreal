// src/app/sales/page.tsx
"use client";

export default function Page(props: any) {
  const recommendation = props?.searchParams?.recommendation ?? '';

  return (
    <main>
      <h1>Página de Vendas</h1>
      <p>Recomendação: {recommendation}</p>
    </main>
  );
}


