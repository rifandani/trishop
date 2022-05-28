import { FC } from 'react'
import AboutTeamCard from './AboutTeamCard'

const teams = [
  {
    id: 1,
    name: 'Alex',
    job: 'Frontend Developer',
    desc: 'A man who stands for nothing.',
    imageUrl: '/images/teams/alex.jpg',
  },
  {
    id: 2,
    name: 'Barbara',
    job: 'UI/UX Developer',
    desc: 'A woman who stands for nothing.',
    imageUrl: '/images/teams/barbara.jpg',
  },
  {
    id: 3,
    name: 'Cindy',
    job: 'UI/UX Developer',
    desc: 'A woman who stands for nothing.',
    imageUrl: '/images/teams/cindy.jpg',
  },
  {
    id: 4,
    name: 'Daniel',
    job: 'Backend Developer',
    desc: 'A man who stands for nothing.',
    imageUrl: '/images/teams/daniel.jpg',
  },
]

const AboutTeam: FC = () => {
  return (
    <section className="w-full bg-white">
      {/* real content */}
      <div className="-m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((team) => (
          <AboutTeamCard key={team.id} team={team} />
        ))}
      </div>
    </section>
  )
}

export default AboutTeam
