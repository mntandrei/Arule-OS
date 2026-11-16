export function saveSession(stage: string) {
    sessionStorage.setItem("stage", stage);
}

export function getSession(): string | null {
    return sessionStorage.getItem("stage");
}