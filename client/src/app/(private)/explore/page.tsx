'use client';
import Section from '../../../components/layout/Section';
import FiltersAndCards from '../../../components/pages-components/explore/FiltersAndCards';

const page = () => {
    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Explore</h1>

            <FiltersAndCards />
        </Section>
    );
};
export default page;
