import FilterForm from './components/FilterForm';

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Vehicle Filter</h1>
            <FilterForm />
        </main>
    );
}
