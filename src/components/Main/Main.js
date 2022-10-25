import { useState } from "react"

export const Main = (props) => {
    return (
        <main className="main">
            <section className="file">
                <div className="content" ref={props.contentRef}>
                    <h3 className="content__hint">Загрузите файл для расчётов:</h3>
                    <form className="content__form" onSubmit={props.onButtonClick}>
                        <input className="content__file-input" type="file" name="file" onChange={props.setFile}></input>
                        <button className="content__button" type="submit" disabled ref={props.fileField}>Отправить файл</button>
                    </form>
                </div>
                <div className="processed processed_hidden" ref={props.processedRef}>
                    <form className="processed__form" onSubmit={props.handleProcessedButton}>
                        <label className="processed__label" htmlFor="initial">Введите строку, с которой будет вестись расчёт (начиная со строки 8)</label>
                        <input className="processed__input" name="initial" type="number" onChange={props.handleChangeFirst}></input>
                        <label className="processed__label" htmlFor="final">Введите строку, по которую будет вестись расчёт</label>
                        <input className="processed__input" name="final" type="number" onChange={props.handleChangeSecond}></input>
                        <button className="processed__buton">Получить данные</button>
                        <h3>Расчёт для выбранного участка дороги:</h3>
                        <span className="processed__data">Углеродный след автобуса: {props.us}</span>
                        <span className="processed__data">Углеродный след на одного пассажира: {props.usPas}</span>
                        <span className="processed__data">Углеродный след  автомобиля: {props.gasFootprint}</span>
                    </form>
                </div>
            </section>
        </main>
    )
}