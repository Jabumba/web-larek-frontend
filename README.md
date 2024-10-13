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
- src/scss/styles.scss — корневой файл стилей
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


# Архитектура
Проект web-larek реализован на основе паттерна проектирования MVP. Соответственно, само приложение разделено на три части: model(бизнес-логика/данные), view(отображение), presenter(связующий компонент между model и view).
Слой presenter представлен одноименным классом, который содержит в себе метод инициализации форм (init), метод рендера страницы (globalRender), который используется при каждой перезагрузки страницы. А также методы-события - их мы передаем в качестве аргументов в методы классов для того, чтобы привязать к обработчикам событий HTML-элементов.
Слои приложения взаимодействуют между собой согласно паттерну MVP, тоесть связующим в цепочке взаимодействия является presenter. Когда пользователь взаимодействует со страницей, его действия отслеживают обработчики событий, которые входят в свою очередь в зону ответственности view(отображения). Затем view считывает данные (если таковые имеются) и сигнализирует presenter о произошедшем событии. После данные введённые пользователем передаются через слой presenter в методы модели. Тем самым создается цепочка взаимодействия V-P-M (и в обратном порядке от model до view после изменения исходных данных, полученных из view).  

class Presenter {
    catalogCardTemplate: HTMLTemplateElement; - template-элемент товара в каталоге
    previewCardTemplate: HTMLTemplateElement; - template-элемент товара с подробным описанием в модальном окне
    basketCardTemplate: HTMLTemplateElement; - template-элемент товара в корзине
    basketTemplate: HTMLTemplateElement; - template-элемент корзины
    orderFormTemplate: HTMLTemplateElement; - template-элемент формы order
    contactsFormTemplate: HTMLTemplateElement; - template-элемент формы contacts

    protected orderForm: IForm; - компонент формы order
	protected contactsForm: IForm; - компонент формы contacts

    constructor(
        protected apiProduct: ApiProduct, - обёртка для api-клиента
        public model: Model, - компонент модели данных 
        protected page: IPage, - компонент для управления контентом на странице
        protected basket: IBasket, - компонент корзины
		protected orderFormConstructor: IFormConstructor, - конструктор формы order
        protected contactsFormConstructor: IFormConstructor, - конструктор формы contacts
		protected catalogCardConstructor: ICardConstructor, - конструктор товара в каталоге
        protected previewCardConstructor: ICardConstructor, - конструктор товара в модальном окне
        protected basketCardConstructor: ICardConstructor, - конструктор товара в корзине
		protected modal: IPopup, - компонент модального окна
        protected orderResult: IOrderResult - компонент успешного оформления заказа
    ) {
        // поиск всех template-элементов, перечисленных в полях класса
    }

    init() { - в этом методе инициализуируем формы и вешаем на них необходимые события. Также ставим слушатель события на кнопку закрытия окна успешного заказа

    }

    eventOrderInput(data: IFormData) { - метод проверки на валидность введённых в форму order данных

    }

    eventContactsInput(data: IFormData) { - метод проверки на валидность введённых в форму contacts данных

    }

    eventOpenOrderForm() { - метод открытия формы order в модальном окне

    }

    eventOpenContactsForm() { - метод открытия формы contacts в модальном окне

    }

    eventSubmitOrderForm() { - метод происходящий при событии submit в форме order

    }

    eventSubmitContactsForm() { - метод происходящий при событии submit в форме contacts

    }

    eventOpenOrderResult() { - метод отправки post-запроса на сервер после заполнения всех требуемых данных в формах через apiProduct, очистка форм и объекта заказа

    }

    eventOpenCard(card: IBaseCard) { - метод для открытия модального окна с товаром с подробным описанием

    }

    eventAddToBasket(card: IBaseCard) { - метод для удаления товара в список заказа

    }

    eventDeleteFromBasket(card: IBaseCard) { - метод для удаления товара из списка заказа

    }

    eventOpenBasket() { - метод открытия корзины в модальном окне

    }

    globalRender() { - метод для начальной отрисовки главной страницы сервиса web-larek

    }
}

# Бизнес-логика
Слой данных реализован классом Model.
Model существует для работы с двумя основными типами данных:
1) Карточки товаров, которые мы получаем при запросе с сервера. Интерфейс ICard.
2) Объект заказа, отправляемый на сервер при заполнении всех требуемых для корректного заказа данных. Интерфейс IOrder.
Model может возвращать карточки товаров и принимать их.
Важно будет упомянуть, что для создания Model был использован паттерн проектирования Builder, чтобы постепенно изменять объект заказа в ходе его оформления. Model содержит методы редактирования объекта заказа.

class Model {
    protected _items: ICard[]; - товары, полученные с сервера
    private order: IOrder; - объект заказа

    constructor() {
        // инициализация модели данных
    }

    set items(data: ICard[]) { - метод 
    }

    get items() { - метод 
    }

    setPayment(payment: string) { - метод установки способа оплаты
    }
    
    setEmail(email: string) { - метод установки электронной почты
    }
    
    setPhone(phone: any) { - метод установки телефона
    }

    setAddress(address: string) { - метод установки адреса доставки
    }

    addItem(orderItem: string) { - метод добавления id выбранного товара
    }

    deleteItem(orderItem: string) { - метод удаления id выбранного товара
    }

    getOrderLength() { - метод для вывода количества выбранных товаров
    }

    changeTotal() { - метод изменения цены заказа
    }

    getOrder() { - метод для получения объекта заказа
    }

    clear() { - метод очистки объекта заказа
    }

    isValid(obj: IFormData) { - метод валидации данных, введённых в форму
    }

    getData(id: string) { - метод для вывода требуемого товара по id 
    }
}

# Отображение
Отображения - самая большая часть проекта по объему написанного кода. Они разделены на две крупные группы и отдельные классы:
1) cards - классы для работы с одним типом данных - ICard. Имеет абстрактный класс BaseCard, содержащий в себе общие поля и методы для всех дочерних классов. Карточки товаров отличаются лишь внешним видом и количеством выводимых на страницу данных.

abstract class BaseCard implements IBaseCard { - базовый компонент для всех карточек, является абстрактным
    card: HTMLElement; - элемент карточки
    title: HTMLElement; - элемент с названием карточки
    price: HTMLSpanElement; - элемент с ценой товара
    protected _id: string; - уникальный идентификатор карточки

    constructor(
        template: HTMLTemplateElement - template-элемент карточки
    ) {
        // инициализация базовых полей класса
    }

    set id(value: string) {
        // устанавливаем id
    }

    get id(): string {
        // выводим id
    }

    abstract setEvent(event: Function): void - устанавливаем событие на нужный элемент (выбор зависит от условия задачи)

    render(data: ICard): HTMLElement { - вывод элемента карточки
        // Отрисовка карточки
        return this.card; - возвращаем элемент карточки
    }
}

class BasketCard extends BaseCard implements IBaseCard { - компонент товара в корзине
    protected index: HTMLSpanElement; - порядковый носер товара в корзине
    protected button: HTMLButtonElement; - кнопка удаления из корзины

    constructor(
        template: HTMLTemplateElement - template-элемент карточки
    ) {
        // инициализация полей класса и работа с ними
    }

    setIndex(index: string): void {
        // назначение порядкового номера товару
    }

    setEvent(event: Function): void {
        устанавливаем событие на кнопку удаления
    }

    render(data: ICard): HTMLElement { - вывод элемента карточки
        // Отрисовка карточки
        return this.card; - возвращаем элемент карточки
    }
}

class CatalogCard extends BaseCard implements IBaseCard { - компонент товара в каталоге
    protected category: HTMLSpanElement; - элемент с категорией товара
    protected image: HTMLImageElement; - элемент картинки

    constructor(
        template: HTMLTemplateElement - template-элемент карточки
    ) {
        // инициализация полей класса и работа с ними
    }

    setEvent(event: Function): void {
        устанавливаем событие на саму карточку
    }

    render(data: ICard): HTMLElement { - вывод элемента карточки
        // Отрисовка карточки
        return this.card; - возвращаем элемент карточки
    }
}

class PreviewCard extends BaseCard implements IBaseCard { - компонент товара в модальном окне
    protected category: HTMLSpanElement; - элемент категории товара
    protected image: HTMLImageElement; - элемент карточки
    protected description: HTMLParagraphElement; - элемент с описанием
    protected button: HTMLButtonElement; - элемент кнопки добавления в корзину

    constructor(
        template: HTMLTemplateElement - template-элемент карточки
    ) {
        // инициализация полей класса и работа с ними
    }

    
    setEvent(event: Function): void {
        // устанавливаем событие на кнопку добавления в корзину
    }

    changeButtonStatus(openedData: ICard, selectId?: string): void { - метод изменения состояния кнопки
        // изменение состояния кнопки добавления в корзину
    }

    render(data: ICard): HTMLElement { - вывод элемента карточки
        // Отрисовка карточки
        return this.card; - возвращаем элемент карточки
    }
}

2) forms - классы для работы с вводимыми пользователем данными. Внутри форм ведется работа с типом данных IFormData. Также как и cards имеет общий абстрактный класс (Form).

abstract class Form implements IForm { - базовый компонент для всех форм, является абстрактным
	form: HTMLFormElement; - элемент формы
	submitButton: HTMLButtonElement; - кнопка submit для отправки данных в модель и открытия следующей формы
	errorField: HTMLSpanElement; - элемент с выводимой пользователю ошибкой
	inputList: HTMLInputElement[]; - массив input-элементов
	eventInput: Function; - функция для input

    constructor(
        formTemplate: HTMLTemplateElement - template-элемент формы
    ) {
        // инициализация полей класса и работа с ними
    }

	submitOn(): void { - метод включения submit кнопки
	}

	submitOff(): void { - метод отключения submit кнопки и вывод ошибки в errorField
	}

	abstract getValue(): IFormData - абстрактный метод для вывода данных, введённых пользователем в поля формы

	setEventSubmit(event: Function): void { - метод установки обработчика событий на submit-кнопку
    }

	setEventInput(event: Function): void { - метод установки события в eventInput
	}

	clearValue(): void { - метод для очистки данных, введённых в форму
	}

	render(): HTMLFormElement { - метод вывода элемента формы
	}
}

ContactsForm extends Form implements IForm {
	protected inputEmailField: HTMLInputElement; - input-элемент для ввода электронной почты
	protected inputPhoneField: HTMLInputElement; - input-элемент для ввода номера телефона

	constructor(
        formTemplate: HTMLTemplateElement - template-элемент формы
    ) {
        // инициализация полей класса и работа с ними
    }

	getValue(): IFormData { - метод для вывода данных, введённых пользователем в поля формы

	}
}

OrderForm extends Form implements IForm {
	protected inputAddressField: HTMLInputElement; - input-элемент для ввода адреса доставки
	protected buttonPayment: HTMLButtonElement[]; - массив кнопок с выбором способа оплаты заказа

	constructor(
        formTemplate: HTMLTemplateElement - template-элемент формы
    ) {
        // инициализация полей класса и работа с ними
    }

	getValue(): IFormData { - метод для вывода данных, введённых пользователем в поля формы

	}
}

3) Basket - класс, используемый при открытии корзины. В него мы помещаем выбранные товары.

export class Basket implements IBasket { - компонент корзины в модальном окне
    basket: HTMLDivElement; - элемент самой корзины
    cardList: HTMLUListElement; - элемент со списком товаров
    button: HTMLButtonElement; - кнопка для открытия модального окна и начала заполнения данных заказа
    basketPrice: HTMLSpanElement; - элемент с суммой цен всех товаров в корзине
    
    constructor(template: HTMLTemplateElement) { - template-элемент карточки
        // инициализация полей класса и работа с ними
    }

    addCard(card: HTMLElement) { - добавление элемента карточки в корзину
        // добавление в корзину
    }

    clear() { - очистка корзины от элементов карточек
        // очистка
    }

    changeButtonStatus(length: number) { - метод изменения состояния кнопки
        
    }

    setEvent(event: Function) { - метод установки события на кнопку

    }

    render(price: number): HTMLElement {
        // вывод элемента корзины
    }
}

4) OrderResult - класс успешного ответа сервера на отправленный нами заказ.

class OrderResult implements IOrderResult {
    orderElement: HTMLDivElement; - элемент успешного ответа сервера
    totalElement: HTMLParagraphElement; -  сумма к оплате
    button: HTMLButtonElement; - кнопка закрытия 

    constructor(template: HTMLTemplateElement) { - template-элемент успешного ответа
        // инициализация полей класса и работа с ними
    }

    setEvent(event: Function) { - метод установки события на кнопку

    }

    render(price: number): HTMLElement {
        // вывод элемента успешного ответа сервера
    }
}

5) Page - компонент для управления контентом на странице. Используется для размещения контента в стартовом окне и добавления обработчика для кнопки корзины.

class Page implements IPage {
    basketButton: HTMLButtonElement; - кнопка на главной странице для открытия корзины
    cardContainer: HTMLElement; - каталог товаров

    constructor() {
        // инициализация полей класса
    }

    setCardContainer(cards: HTMLElement[]) { - метод установки товаров с сервера в каталог

    }

    setBasketLength(length: number) { - метод установки числа товаров в корзине на счётчик рядом с кнопкой открытия корзины
    }

    setEventBasketButton(event: Function) { - метод установки события на кнопку открытия корзины
    }
}

6) Popup - класс для отображения одного на весь проект модального окна, в которое мы по необходимости помещаем нужный контент и инициализируем открытие.

class Popup implements IPopup {
    modal: HTMLDivElement; - элемент для затемнения контента вне модальным окном
    container: HTMLDivElement; - само модальное окно
    buttonClose: HTMLButtonElement; - кнопка закрытия модального окна
    protected _content: HTMLElement; - элемент с индивидуальным контентом

    constructor(modal: HTMLDivElement) {
        this.modal = modal;
        this.container = modal.querySelector('.modal__container');
        this.buttonClose = this.container.querySelector('.modal__close');
        this._content = this.container.querySelector('.modal__content');

        this.buttonClose.addEventListener('click', (() => {
            this.close();
        }));
        this.modal.addEventListener('click', (() => {
            this.close();
        }));
        this.container.addEventListener('click', (event) => event.stopPropagation());
    }
    constructor(modal: HTMLDivElement) { - элемент модального окна
        // инициализация полей класса и работа с ними
    }

    set content(el: HTMLElement) { - установка индивидуального контента
    }

    open() { - метод открытия модального окна
        
	}

	close() { - метод закрытия модального окна
        
	}
}

# tools - папка со вспомогательными методами, классами. В данный момент в ней лежит класс ApiProduct - обёртка для api-клиента Api (base/api.ts). ApiProduct делает ровно тоже самое, что и Api, но в более удобной форме.

class ApiProduct implements IApiProduct {
    api: Api; - основное Api для работы с сервером
    protected _imageAddress: string; - адрес для получения корректных изображений с сервера

    constructor(api: any, address: string) {
        this.api = api;
        this.imageAddress = address;
    }

    set imageAddress(address: string) { - установка адреса
        this._imageAddress = address;
    }

    get imageAddress() { - вывод адреса
        return this._imageAddress
    }

    getCards(uri: string) { - метод для запроса товаров с сервера
        const productResponse = this.api.get(uri) as Promise<ApiListResponse<ICard>>
        return productResponse.then((data) => {
            const cardList: ICard[] = data.items

            cardList.map((item) => {
                item.image = this.imageAddress + item.image;
                return item
            })

            return cardList
        })
    }

    postOrder(uri: string, data: IOrder) { - метод для отправки объекта заказа на сервер и получения объекта 
        const productResponse = this.api.post(uri, data) as Promise<ISuccessOrder>

        return productResponse.then((data) => {
            const successOrder: ISuccessOrder = data;
            return successOrder
        })
    }
}

# Описание основных типов данных
interface IFormData { - значения, введённые пользователем в форму, ни одно из полей не является обязательным для большей гибкости работы в том случае, если были введены не все данные
    payment?: string; - способ оплаты заказа
    address?: string; - адрес доставки
    email?: string; - адрес электронной почты
    phone?: string; - номер контактного телефона пользователя
}

interface ICard { - объект продукта, получаемый с сервера и используемый для работы с товарами
    id: string; - уникальный идентификатор товара
    description: string; - подробное описание товара
    image: string; - картинка
    title: string; - название товара
    category: string; - категория, к которой относится товар
    price: number; - цена товара
}

interface IOrder { - объект заказа, отправляемый на сервер при заполнении всех необходимых данных
    payment: string; - способ оплаты заказа
    email: string; - адрес электронной почты
    phone: string; - номер контактного телефона пользователя
    address: string; - адрес доставки
    total: number; - сумма стоимости всех товаров из items
    items: string[]; - массив уникальных идентификаторов(id) товаров
}

interface ISuccessOrder { - объект, возвращаемый в случае успешного заказа
    id: string - уникальный идентификатор заказа
    total: number - сумма к оплате
}