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

export default function AboutTeam() {
  return (
    <section className="w-full bg-white">
      {/* real content */}
      <div className="flex flex-wrap -m-4">
        {teams.map((team) => (
          <AboutTeamCard key={team.id} team={team} />
        ))}
      </div>
    </section>
  )
}
