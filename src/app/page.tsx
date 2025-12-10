import PeriodicTable from "@/components/PeriodicTable";

export default function Home() {
  return (
    <main className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="absolute inset-x-6 top-20 bottom-12 -z-10 rounded-[42px] bg-white/70 blur-3xl" />
      <PeriodicTable />
    </main>
  );
}
