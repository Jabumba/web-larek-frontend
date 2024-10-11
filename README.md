# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


Архитектура
Проект web-larek реализован на основе паттерна проектирования MVP. Соответственно, само приложение разделено
на три части: model(бизнес-логика/данные), view(отображение), presenter(связующий компонент между model и view).
Слой presenter представлен одноименным классом, который содержит в себе метод инициализации форм (init), метод рендера страницы (globalRender), который используется при каждой перезагрузки страницы. А также методы-события - их мы передаем в качестве аргументов в методы классов для того, чтобы привязать к обработчикам событий HTML-элементов.

Бизнес-логика
Слой данных реализован классами Order, Model.
Order - объект заказа, состоящий из публичных полей для их заполнения.
Model существует для работы с двумя основными типами данных:
1) Карточки товаров, которые мы получаем при запросе с сервера;
2) Объект заказа, отправляемый на сервер при заполнении всех требуемых для корректного заказа данных.
Model может возвращать карточки товаров и принимать их.
Важно будет упомянуть, что для создания Model был использован паттерн проектирования Builder, чтобы постепенно изменять объект заказа в ходе его оформления. Model содержит методы редактирования объекта заказа.

Отображение
Отображения - самая большая часть проекта по объему написанного кода. Они разделены на две крупные группы и отдельные классы:
1) cards - классы для работы с одним типом данных - ICard. Имеет абстрактный класс BaseCard, содержащий в себе общие поля и методы для всех дочерних классов. Карточки товаров отличаются лишь внешним видом и количеством выводимых на страницу данных.
2) forms - классы для работы с вводимыми пользователем данными. Также как и cards имеет общий абстрактный класс (Form).
3) Basket - класс, используемый при открытии корзины. В него мы помещаем выбранные товары.
4) OrderResult - класс успешного ответа сервера на отправленный нами заказ.
5) Page - класс для размещения контента в стартовом окне и добавления обработчика для кнопки корзины.
6) Popup - класс для отображения одного на весь модального окна, в которое мы по необходимости помещаем нужный контент и инициализируем открытие.

tools - папка со вспомогательными методами, классами. В данный момент в ней лежит класс ApiProduct - обёртка для api-клиента Api (base/api.ts). ApiProduct делает ровно тоже самое, что и Api, но в более удобной форме.