import { footerContent as defaultContent } from "../content/footerContent";

export default function Footer({ content = defaultContent }) {
  return (
    <footer className="bg-[var(--porcelain-100)] border-t border-[var(--line)] pt-20 pb-10 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
              <span className="text-xl font-bold text-[var(--ink-900)]">{content.brand.name}</span>
            </div>
            <p className="text-[var(--ink-700)] text-sm leading-relaxed mb-1 max-w-xs">{content.brand.description}</p>
            <p className="text-[var(--ink-700)] text-sm leading-relaxed mb-8 max-w-xs">{content.brand.subDescription}</p>

            {/* Socials */}
            <div className="flex gap-4">
              {content.socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="p-2 rounded-full bg-white/60 text-[var(--ink-700)] hover:text-[var(--ink-900)] hover:bg-white/70 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {content.linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-[var(--ink-900)] font-semibold mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link, i) => (
  <li key={i}>
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-[var(--ink-700)] hover:text-indigo-400 transition-colors"
    >
      {link.label}
    </a>
  </li>
))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h4 className="text-[var(--ink-900)] font-semibold mb-6">{content.newsletter.title}</h4>
            <p className="text-sm text-[var(--ink-700)] mb-4">{content.newsletter.description}</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder={content.newsletter.placeholder}
                className="w-full px-4 py-2 rounded-lg bg-white/60 border border-[var(--line)] text-[var(--ink-900)] text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="w-full px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors">
                {content.newsletter.buttonLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-col md:flex-row items-center justify-between text-sm text-[var(--ink-500)]">
          <p>{content.bottomBar.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>{content.bottomBar.note}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
