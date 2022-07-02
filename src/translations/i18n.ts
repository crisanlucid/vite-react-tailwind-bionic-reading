import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      About: 'About',
      Playground: 'Playground',
      German: 'German',
      English: 'English',
      'Integrate effortlessly with any technology stack':
        'Integrate effortlessly with any technology stack',
      'Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon.':
        'Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon.',
      'Extreme performance': 'Extreme performance',
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit':
        'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
      'Privacy focused': 'Privacy focused',
      'No third parties': 'No third parties',
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves':
        'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
      'Secure by default': 'Secure by default',
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right':
        'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
      '24/7 Support': '24/7 Support',
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail':
        'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
    },
  },
  de: {
    translation: {
      About: 'Über',
      Playground: 'Playground',
      German: 'Deutsch',
      English: 'Englisch',
      'Integrate effortlessly with any technology stack':
        'Integrieren Sie sich mühelos in jeden Technologie-Stack',
      'Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon.':
        'Hin und wieder werden Sie einen Golbat sehen, dem einige Reißzähne fehlen. Dies geschieht, wenn der Hunger es dazu treibt, zu versuchen, ein Stahl-Pokémon zu beißen.',

      'Extreme performance': 'Extreme Leistung',
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit':
        'Dieser Staub ist eigentlich ein starkes Gift, das sogar einen Profi-Wrestler krank machen wird, Regice hüllt sich in eine eisige Luft von -328 Grad Fahrenheit',
      'Privacy focused': 'Privacy-fokussiert',
      'No third parties': 'Keine Drittparteien',
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves':
        'Sie sind beliebt, aber sie sind selten. Trainer, die sie rücksichtslos zur Schau stellen, können von Dieben angegriffen werden.',

      'Secure by default': 'Standardmäßig sicher',
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right':
        'Er kann zwar immer noch nicht fliegen, aber seine Sprungkraft ist überragend, in Alola wachsen die Pilze auf Paras nicht richtig heran',
      '24/7 Support': '24/7-Support',
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail':
        'Rapidash kann normalerweise gesehen werden, wie er lässig über die Felder und Ebenen galoppiert, Skitty ist dafür bekannt, seinem eigenen Schwanz hinterherzujagen',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
