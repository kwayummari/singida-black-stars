import ArticleDetail from './ArticleDetail';

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // For static export, we need to provide at least one slug
  try {
    // Try to fetch slugs from API if available
    const response = await fetch('https://singidablackstars.co.tz/admin/api/news/getAllSlugs.php');

    console.log(response);
    
    // Check if the request was successful
    if (response.ok) {
      const slugs = await response.json();
      return slugs.map(slug => ({ slug }));
    }
  } catch (error) {
    console.error('Error fetching slugs:', error);
  }
  
  // Fallback to hardcoded slugs if API is unavailable
  return [
    { slug: 'black-stars-foundation-launches-community-health-initiative' },
    { slug: 'team-announces-signing-of-new-striker' },
    { slug: 'match-report-victory-against-rivals' },
    { slug: 'pre-season-training-camp-announced' },
    { slug: 'stadium-renovations-completed-ahead-of-schedule' }
  ];
}

// Enable dynamic rendering for routes not included in generateStaticParams
export const dynamicParams = true;

// This metadata will be used as the default for this route
export const metadata = {
  title: 'News Article | Singida Black Stars FC',
  description: 'Read the latest news from Singida Black Stars Football Club',
};

export default function ArticlePage({ params }) {
  return <ArticleDetail slug={params.slug} />;
}