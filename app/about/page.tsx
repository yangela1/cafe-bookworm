import type { Metadata } from 'next'
import { GithubLogoIcon, UserIcon, SmileyIcon } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'about | cafe bookworm',
  description:
    "meet angela, the writer behind cafe bookworm - honest cafe reviews from metro vancouver, written with her boyfriend's help.",
}

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 lowercase">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="aspect-[3/4] w-40 sm:w-56 md:w-full mx-auto md:mx-0 rounded-2xl border border-dashed border-base-300 bg-base-200 text-base-content/40 flex flex-col items-center justify-center gap-2"
              aria-hidden="true"
            >
              <UserIcon weight="fill" className="w-16 h-16" />
              <span className="text-sm">photo coming soon</span>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <h1 className="text-4xl font-medium flex items-center gap-2">
                hello
                <SmileyIcon weight="bold" className="w-8 h-8" aria-hidden="true" />
              </h1>

              <div className="text-base-content/80 leading-relaxed space-y-4">
                <p>
                  welcome to my cafe blog! my name is angela and i&apos;m based in metro
                  vancouver. i like to explore local cafes every weekend with my boyfriend. i love
                  matcha and coffee both, while my boyfriend loves teas and cafe food more - so
                  these reviews are a combination of both our opinions.
                </p>
                <p>
                  when i was a student, i was always looking for a good spot to study and get
                  homework done. these days, i still look for a place to work on projects, or
                  sometimes just a nice spot to sit down and enjoy a drink. i hope this blog helps
                  you find your next favourite coffee spot and to support local businesses.
                </p>
              </div>

              <a
                href="https://github.com/yangela1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm gap-2 w-fit"
              >
                <GithubLogoIcon weight="bold" className="w-4 h-4" aria-hidden="true" />
                check out my other projects on github
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
