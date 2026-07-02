export const Initials = (name?: string) => {
    const getInitials = (fullName: string): string => {
        if (!fullName.trim()) return "?";
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const initials = name &&  getInitials(name);

    return initials
}