import React from 'react'
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
} from '@mantine/core'
import { Icon as TablerIcon } from 'tabler-icons-react'
import { Gauge, Cookie, User, Message2, Lock } from 'tabler-icons-react'
import { useTranslation } from 'react-i18next'

export const MOCKDATA = [
  {
    icon: Gauge,
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
  },
  {
    icon: User,
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
  },
  {
    icon: Cookie,
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
  },
  {
    icon: Lock,
    title: 'Secure by default',
    description:
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
  },
  {
    icon: Message2,
    title: '24/7 Support',
    description:
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
  },
]

interface FeatureProps {
  icon: TablerIcon
  title: string
  description: string
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme()
  const { t } = useTranslation()
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: 20, height: 20 }} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {t(title)}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {t(description)}
      </Text>
    </div>
  )
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}))

interface FeaturesGridProps {
  title: string
  description: string
  data?: FeatureProps[]
}

export function AboutPage({
  title,
  description,
  data = MOCKDATA,
}: FeaturesGridProps) {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const { t } = useTranslation()
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ))

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>{t(title)}</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {t(description)}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  )
}
