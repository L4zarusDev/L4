import { google } from 'googleapis';
import { Octokit } from '@octokit/rest';
import { cache } from 'react';
import StatsClient from './StatsClient';

// Types for our stats
interface Stat {
  value: number;
  label: string;
}

// Debug flag for local testing
const DEBUG = process.env.NODE_ENV === 'development';

// Server Component
const getCachedChannelInfo = cache(
  async (channelId: string): Promise<Stat[]> => {
    if (DEBUG) {
      return [
        { value: 10000000, label: 'Youtube Views' },
        { value: 100000, label: 'Youtube Subscribers' },
      ];
    }

    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });

    try {
      const response = await youtube.channels.list({
        part: ['statistics'],
        id: [channelId],
      });

      if (response.data.items && response.data.items.length > 0) {
        const channel = response.data.items[0];
        return [
          {
            value: Number(channel.statistics?.viewCount) || 0,
            label: 'Youtube Views',
          },
          {
            value: Number(channel.statistics?.subscriberCount) || 0,
            label: 'Youtube Subscribers',
          },
        ];
      } else {
        console.log('Channel not found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching channel info:', error);
      return [];
    }
  },
);

const getCachedGitHubStars = cache(
  async (username: string): Promise<number> => {
    if (DEBUG) {
      return 528;
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN,
    });

    try {
      const { data: repos } = await octokit.repos.listForUser({
        username,
        per_page: 100, // Adjust if you have more than 100 repos
      });

      const totalStars = repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count ?? 0),
        0,
      );
      return totalStars;
    } catch (error) {
      console.error('Error fetching GitHub stars:', error);
      return 0;
    }
  },
);

export const Stats = async () => {
  const YOUR_CHANNEL_ID = 'UCkwRYP1J1hjRXwo5lyBRWdQ';
  const YOUR_GITHUB_USERNAME = 'L4zarusDev';

  let youtubeStats: Stat[] = [];
  let githubStars = 0;

  try {
    [youtubeStats, githubStars] = await Promise.all([
      getCachedChannelInfo(YOUR_CHANNEL_ID),
      getCachedGitHubStars(YOUR_GITHUB_USERNAME),
    ]);
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Provide fallback data in case of errors
    youtubeStats = [
      { value: 0, label: 'Youtube Views' },
      { value: 0, label: 'Youtube Subscribers' },
    ];
    githubStars = 0;
  }

  const statsData: Stat[] = [
    ...youtubeStats,
    { value: githubStars, label: 'Github Stars' },
  ];

  return <StatsClient statsData={statsData} isDebug={DEBUG} />;
};

export default Stats;
