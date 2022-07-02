import React from 'react'
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Text,
} from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { ChevronDown } from 'tabler-icons-react'
import { ThemeToggle } from '../ThemeToggle'
import { LanguagePicker } from '../LanguagePicker'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}))

export interface HeaderActionProps {
  links: {
    link: string
    label: string
    links?: { link: string; label: string }[]
  }[]
}

export function HeaderAction({ links }: HeaderActionProps) {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const [opened, toggleOpened] = useBooleanToggle(false)
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{t(link.label)}</Menu.Item>
    ))

    if (menuItems) {
      console.log(menuItems)
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <Link to={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{t(link.label)}</span>
                <ChevronDown size={12} />
              </Center>
            </Link>
          }
        >
          {menuItems}
        </Menu>
      )
    }

    return (
      <Link key={link.label} to={link.link} className={classes.link}>
        {t(link.label)}
      </Link>
    )
  })

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />

          <Text component={Link} to="/">
            Bionic Reader
          </Text>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Group spacing={5} className={classes.links}>
          <ThemeToggle />
          <LanguagePicker />
        </Group>
      </Container>
    </Header>
  )
}
