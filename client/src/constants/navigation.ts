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
} from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
    icon?: React.ElementType; // optional: icons for logged-in nav
}

export const PRIVATE_NAV_ITEMS: NavItem[] = [
    { label: 'Explore', href: '/explore', icon: Home },
    // { label: 'Profile', href: '/profile', icon: User },
    // { label: 'Chat with Neuronix', href: '/chat', icon: MessageCircle },
    { label: 'Upgrade Plan', href: '/pricing', icon: Crown },
    // { label: 'Settings', href: '/settings', icon: Settings },
    // { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Logout', href: '/logout', icon: LogOut },
];

export const PUBLIC_NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
];
