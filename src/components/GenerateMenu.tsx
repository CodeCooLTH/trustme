// Stub for Vuexy's vertical/horizontal menu generator.
// The SafePay marketing route does not render dashboard menus, so this is a
// no-op placeholder. The full implementation lives in Vuexy's theme source and
// can be copied later if the paces dashboards need it.

type AnyMenuData = unknown[]

export const GenerateVerticalMenu = ({ menuData: _menuData }: { menuData: AnyMenuData }) => null
export const GenerateHorizontalMenu = ({ menuData: _menuData }: { menuData: AnyMenuData }) => null

export default GenerateVerticalMenu
