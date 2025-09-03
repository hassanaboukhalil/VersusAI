import {
    Home,
    // User,
    // MessageCircle,
    Crown,
    // Settings,
    // Bell,
    LogOut,
    // Sparkles,
    // DollarSign,
    // Mail,
    // Info,
    Sparkles,
    Mail,
    Search,
} from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
    icon?: React.ElementType; // optional: icons for logged-in nav
}

export const PRIVATE_NAV_ITEMS: NavItem[] = [
    { label: 'Explore', href: '/explore', icon: Search },
    // { label: 'Profile', href: '/profile', icon: User },
    // { label: 'Chat with Neuronix', href: '/chat', icon: MessageCircle },
    { label: 'Upgrade Plan', href: '/pricing', icon: Crown },
    // { label: 'Settings', href: '/settings', icon: Settings },
    // { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Logout', href: '/logout', icon: LogOut },
];

export const PUBLIC_NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'Features', href: '#features', icon: Sparkles },
    { label: 'Pricing', href: '#pricing', icon: Crown },
    { label: 'Contact', href: '#contact', icon: Mail },
];
