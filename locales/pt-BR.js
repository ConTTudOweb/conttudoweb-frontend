import pt from 'vuetify/es5/locale/pt'

const dashboard = 'Painel'
const core = 'Cadastros'
const inventory = 'Inventário'
const sale = 'Vendas'
const federative_unit = 'Unidade federativa'
const federative_units = 'Unidades federativas'
const city = 'Cidade'
const cities = 'Cidades'
const person = 'Cliente / Fornecedor'
const persons = 'Clientes / Fornecedores'
const unit_of_measure = 'Unidade de medida'
const units_of_measure = 'Unidades de medida'
const category = 'Categoria de produto'
const categories = 'Categorias de produto'
const subcategory = 'Subcategoria de produto'
const subcategories = 'Subcategorias de produto'
const product_size_register = 'Grade de produto'
const product_size_registers = 'Grades de produto'
const packaging_type = 'Tipo de embalagem'
const packaging_types = 'Tipos de embalagem'
const product = 'Produto'
const products = 'Produtos'

const sale_order = 'Pedido'
const sale_orders = 'Pedidos'

export default {
  $vuetify: pt,

  'company.name': 'ConTTudOweb',
  avatar: 'ConTTudO <web/>',
  search: 'Pesquisar',
  'add-row': 'Adicionar...',

  // menus
  'Dashboard___pt': dashboard,
  'menu.dashboard': dashboard,
  'menu.core': core,
  'menu.inventory': inventory,
  'menu.sale': sale,
  'core-federative-unit___pt': federative_units,
  'core-federative-unit-id___pt': federative_unit,
  'menu.core.federative-units': federative_units,
  'core-city___pt': cities,
  'core-city-id___pt': city,
  'menu.core.cities': cities,
  'core-person___pt': persons,
  'core-person-id___pt': person,
  'menu.core.persons': persons,
  'inventory-unit-of-measure___pt': units_of_measure,
  'inventory-unit-of-measure-id___pt': unit_of_measure,
  'menu.inventory.units-of-measure': units_of_measure,
  'inventory-category___pt': categories,
  'inventory-category-id___pt': category,
  'menu.inventory.categories': categories,
  'inventory-subcategory___pt': subcategories,
  'inventory-subcategory-id___pt': subcategory,
  'menu.inventory.subcategories': subcategories,
  'inventory-product-size-register___pt': product_size_registers,
  'inventory-product-size-register-id___pt': product_size_register,
  'menu.inventory.product-size-registers': product_size_registers,
  'inventory-packaging-type___pt': packaging_types,
  'inventory-packaging-type-id___pt': packaging_type,
  'menu.inventory.packaging-types': packaging_types,
  'product-sizes': 'Itens da Grade',
  'inventory-product___pt': products,
  'inventory-product-id___pt': product,
  'menu.inventory.products': products,
  'product-by-supplier': 'Referências por Fornecedor',
  'packaging': 'Embalagens',

  'sale-sale-order___pt': sale_orders,
  'sale-sale-order-id___pt': sale_order,
  'menu.sale.sale-order': sale_orders,
  'sale-order-items': 'Itens do Pedido',

  // terms
  'about-us': 'Sobre nós',
  'made-with': 'feito com',
  'by': 'por',
  'new-item': 'Adicionar',
  'edit-item': 'Modificar',
  'logout': 'Sair'
}
