import Image from 'next/image';
import { Hero } from './hero';
import { MotionController } from './motion';
import { publicAsset } from './asset-path';

const drinks = [
  {
    number: '01',
    name: 'AVORA LATTE',
    detail: 'Espresso / Milk / Silky Finish',
    className: 'drink--avora',
    image: publicAsset('/assets/signature-coffee/avora-latte.webp'),
    imageWidth: 1344,
    imageHeight: 752,
    sizes: '(max-width: 760px) calc(100vw - 5rem), 55vw',
  },
  {
    number: '02',
    name: 'AMBER CLOUD',
    detail: 'Espresso / Cream / Caramel',
    className: 'drink--amber',
    image: publicAsset('/assets/signature-coffee/amber-cloud.webp'),
    imageWidth: 1344,
    imageHeight: 752,
    sizes: '(max-width: 760px) calc(100vw - 5rem), 39vw',
  },
  {
    number: '03',
    name: 'DARK VELVET',
    detail: 'Double Espresso / Cocoa / Milk',
    className: 'drink--velvet',
    image: publicAsset('/assets/signature-coffee/dark-velvet.webp'),
    imageWidth: 1024,
    imageHeight: 688,
    sizes: '(max-width: 760px) calc(100vw - 5rem), 39vw',
  },
];

const craftStages = [
  ['01', 'Source', 'Season-led origins'],
  ['02', 'Roast', 'Clarity over volume'],
  ['03', 'Pull', 'Dialled by hand'],
  ['04', 'Pour', 'Finished with care'],
];

const menuGroups = [
  {
    category: 'Coffee',
    items: ['Espresso', 'Americano', 'Flat White', 'AVORA Latte', 'Amber Cloud', 'Dark Velvet'],
  },
  {
    category: 'Matcha',
    items: ['Ceremonial', 'Matcha Cloud', 'Strawberry Matcha'],
  },
  {
    category: 'Pastry',
    items: ['Butter Croissant', 'Pain au Chocolat', 'Seasonal Danish'],
  },
];

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <MotionController />
      <Hero />

      <section className="section story" id="statement">
        <div className="panel story__panel reveal" data-reveal>
          <div className="story__visual">
            <Image
              src={publicAsset('/assets/craft/craft-portafilter-preparation.webp')}
              alt="A close view of espresso preparation at AVORA"
              width={880}
              height={1168}
              sizes="(max-width: 760px) calc(100vw - 2.9rem), (max-width: 1100px) 38vw, 42vw"
              quality={90}
              decoding="async"
            />
          </div>

          <div className="story__content">
            <SectionLabel number="02">Our philosophy</SectionLabel>
            <h2>
              <span>Slow down.</span>
              <span className="italic">Taste more.</span>
            </h2>
            <p>
              We believe good coffee deserves time.
              <br />
              From the bean to the final pour,
              <br />
              every detail is considered.
            </p>
            <div className="story__note">
              <span>Our measure</span>
              <strong>Patience</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section signature" id="coffee">
        <div className="panel signature__panel">
          <div className="signature__header reveal" data-reveal>
            <SectionLabel number="03">Signature coffee</SectionLabel>
            <h2>
              Made to
              <br />
              <span className="italic">be yours.</span>
            </h2>
            <p>Three house signatures. Distinct in character, unmistakably AVORA.</p>
          </div>

          <p className="signature__index" aria-hidden="true">
            AVORA LATTE · AMBER CLOUD · DARK VELVET
          </p>

          <div className="drinks" aria-label="Three AVORA signature drinks">
            {drinks.map((drink) => (
              <article className={`drink ${drink.className} reveal`} data-reveal key={drink.name}>
                <div className="drink__topline">
                  <span>{drink.number}</span>
                  <span>House signature</span>
                </div>
                <div className="drink__stage">
                  <Image
                    src={drink.image}
                    alt={`${drink.name} signature coffee`}
                    width={drink.imageWidth}
                    height={drink.imageHeight}
                    sizes={drink.sizes}
                    quality={90}
                    decoding="async"
                  />
                </div>
                <div className="drink__copy">
                  <h3>{drink.name}</h3>
                  <p>{drink.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section craft" id="craft">
        <div className="panel craft__panel reveal" data-reveal>
          <div className="craft__header">
            <SectionLabel number="04">The craft</SectionLabel>
            <p>Four decisions. One considered cup.</p>
          </div>
          <h2>
            <span>From bean</span>
            <span className="italic">to cup.</span>
          </h2>
          <div className="craft__visual">
            <Image
              src={publicAsset('/assets/craft/craft-espresso-extraction.webp')}
              alt="Espresso extracting from a polished coffee machine"
              width={880}
              height={1168}
              sizes="(max-width: 760px) 78vw, (max-width: 1100px) 36vw, (min-width: 1506px) 464px, 30vw"
              quality={90}
              decoding="async"
            />
          </div>
          <div className="craft__stages">
            {craftStages.map(([number, title, detail]) => (
              <article className="craft-stage" key={title}>
                <div className="craft-stage__line">
                  <span>{number}</span>
                  <i aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section experience" id="about">
        <div className="panel experience__panel">
          <div className="experience__intro reveal" data-reveal>
            <SectionLabel number="05">AVORA experience</SectionLabel>
            <h2>
              More than
              <br />
              <span className="italic">a cup.</span>
            </h2>
            <p>
              A warm room, an open table and the quiet ritual that brings people
              together.
            </p>
          </div>

          <div className="collage" aria-label="AVORA atmosphere gallery">
            <div className="collage__item collage__item--main reveal" data-reveal>
              <Image
                src={publicAsset('/assets/experience/experience-cafe-lounge.webp')}
                alt="Warm AVORA café lounge and coffee bar"
                width={880}
                height={1168}
                sizes="(max-width: 760px) calc(100vw - 4.3rem), 55vw"
                quality={90}
                decoding="async"
              />
              <span>01 / Interior</span>
              <strong>Space to stay.</strong>
            </div>
            <div className="collage__item collage__item--detail reveal" data-reveal>
              <Image
                src={publicAsset('/assets/craft/craft-latte-art-pour.webp')}
                alt="Barista pouring latte art by hand"
                width={1168}
                height={880}
                sizes="(max-width: 760px) calc(100vw - 4.3rem), 39vw"
                quality={90}
                decoding="async"
              />
              <span>02 / Preparation</span>
              <strong>Made in view.</strong>
            </div>
            <div className="collage__item collage__item--people reveal" data-reveal>
              <Image
                src={publicAsset('/assets/experience/experience-coffee-conversation.webp')}
                alt="Guests sharing coffee around a table"
                width={1024}
                height={1024}
                sizes="(max-width: 760px) calc(50vw - 2.5rem), 16vw"
                quality={90}
                decoding="async"
              />
              <span>03 / People</span>
              <strong>Meet here.</strong>
            </div>
            <div className="collage__item collage__item--atmosphere reveal" data-reveal>
              <Image
                src={publicAsset('/assets/experience/experience-sunlit-coffee-bar.webp')}
                alt="Sunlight crossing AVORA's quiet coffee bar"
                width={880}
                height={1168}
                sizes="(max-width: 760px) calc(50vw - 2.5rem), 24vw"
                quality={90}
                decoding="async"
              />
              <span>04 / Atmosphere</span>
              <strong>Take your time.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section menu" id="menu">
        <div className="panel menu__panel reveal" data-reveal>
          <div className="menu__lead">
            <SectionLabel number="06">Menu</SectionLabel>
            <h2>
              What are you
              <br />
              <span className="italic">having today?</span>
            </h2>
            <p>House signatures, daily rituals and something warm from the oven.</p>
            <span className="menu__edition">Menu / Edition 01</span>
          </div>

          <div className="menu__groups">
            {menuGroups.map((group, groupIndex) => (
              <article className="menu-group" key={group.category}>
                <div className="menu-group__heading">
                  <span>0{groupIndex + 1}</span>
                  <h3>{group.category}</h3>
                </div>
                <div className="menu-group__items">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
            <p className="menu__footnote">Seasonal menu / Please ask about allergens.</p>
          </div>
        </div>
      </section>

      <section className="section visit" id="visit">
        <div className="panel visit__panel reveal" data-reveal>
          <div className="visit__content">
            <SectionLabel number="07">Visit AVORA</SectionLabel>
            <h2>
              Stay for
              <br />
              <span className="italic">another cup.</span>
            </h2>
            <p>
              Coffee tastes better
              <br />
              when you&apos;re not in a hurry.
            </p>
            <a href="mailto:hello@avoracoffee.com">
              Visit AVORA <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="visit__visual">
            <Image
              src={publicAsset('/assets/visit/visit-avora-tall-facade-entry.webp')}
              alt="AVORA's warmly lit exterior entrance"
              width={880}
              height={1168}
              sizes="(max-width: 760px) calc(100vw - 2.9rem), 45vw"
              quality={90}
              decoding="async"
            />
            <div className="visit__hours">
              <span>AVORA COFFEE</span>
              <span>Daily / 8:00—18:00</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="section footer">
        <div className="panel footer__panel" data-footer-reveal>
          <div className="footer__topline">
            <span>Specialty coffee / AVORA</span>
            <span>Est. 2026</span>
          </div>
          <a className="footer__brand" href="#top" aria-label="AVORA COFFEE, back to top">
            <span>AVORA<sup>®</sup></span>
            <span>COFFEE.</span>
          </a>
          <nav className="footer__nav" aria-label="Footer navigation">
            <a href="#coffee">Coffee</a>
            <a href="#craft">Craft</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#visit">Visit us</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          </nav>
          <div className="footer__bottom">
            <span>© 2026 AVORA COFFEE</span>
            <span>Made for slower moments.</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
