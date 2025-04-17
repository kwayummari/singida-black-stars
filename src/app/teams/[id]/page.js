import TeamDetailClient from './TeamDetail';

// This function generates the possible values for the id parameter
export async function generateStaticParams() {
  try {
    // Fetch all team IDs for static generation
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/getAllTeams.php`);
    const data = await response.json();
    
    if (data && data.data) {
      return data.data.map((team) => ({
        id: team.id.toString(),
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Server component that renders the client component
export default function TeamDetailPage({ params }) {
  return <TeamDetailClient id={params.id} />;
}