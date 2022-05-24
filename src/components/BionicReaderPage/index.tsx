import React, { FC, useState } from 'react'

//helper
const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

//useHook
const useTextProcessing = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [text, setText] = useState('')
  const [pretext, setPretext] = useState('')
  const [listPrepText, setListPrepText] = useState([] as JSX.Element[])

  const onChangeTextare = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e?.target.value)
  }

  const processData = () => {
    const prepText = text.split(' ')
    console.log(prepText)

    const listText = prepText.map((elem) => {
      let preElem = elem
      let showNewLine = false
      const match = /\r|\n/.exec(elem)
      if (match) {
        preElem = elem.trim()
        showNewLine = true
      }

      const mid = Math.floor(preElem.length / 2)

      console.log(preElem.slice(mid))
      return (
        <>
          {showNewLine && (
            <>
              <br />
              <br />
            </>
          )}
          <span className="bio-letter">{preElem.slice(0, mid)}</span>
          {preElem.slice(mid)}
        </>
      )
    })

    return listText
  }

  const onClickButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setPretext('processing...')
    setListPrepText([])

    console.log('wait...')
    setIsDisabled(true)

    const listPrepText = processData()
    setPretext('processing...')

    await timeout(2000)

    setIsDisabled(false)
    setListPrepText(listPrepText)
    setPretext('')
    console.log('done...')
  }

  return {
    listPrepText,
    pretext,
    isDisabled,
    onClickButton,
    processData,
    onChangeTextare,
  }
}

export const BionicReaderPage: FC = () => {
  const { listPrepText, isDisabled, onClickButton, onChangeTextare, pretext } =
    useTextProcessing()
  return (
    <div className="px-3 py-20 w-screen h-screen bg-gray-500">
      <div className="mx-auto max-w-xs h-auto min-h-fit sm:max-w-lg md:max-w-4xl rounded-lg shadow bg-white p-4">
        <h2 className="text-2xl font-bold my-2 text-left">Bionic Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="text-left py-4">
            <h3 className="text-lg font-bold pb-4">Insert Text:</h3>
            <textarea
              className="form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded-lg shadow
              transition
              ease-in-out
              m-0
              mb-4
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name="text"
              id="controlTextarea"
              cols={30}
              rows={10}
              aria-label="empty textarea"
              placeholder="Empty"
              onChange={onChangeTextare}
            ></textarea>
            <button
              className="hover:bg-blue-700 bg-blue-600 text-gray-100 py-2 px-4 rounded"
              disabled={isDisabled}
              onClick={onClickButton}
            >
              Convert
            </button>
          </section>
          <section className="text-left py-4 overflow-hidden">
            <h3 className="text-lg font-bold pb-4">Read Section:</h3>
            <p className="whitespace-pre-wrap break-all">
              {pretext}
              <span className="t-text">
                {listPrepText.map((text) => (
                  <>{text} </>
                ))}
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
