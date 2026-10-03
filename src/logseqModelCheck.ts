import { replaceLogseqMdModel, replaceLogseqVersion } from "."

// Fetch the app version and store it (informational only; never used for graph-type detection).
const fetchAppVersion = async (): Promise<void> => {
    const logseqInfo = (await logseq.App.getInfo("version")) as unknown
    // The version format is like "0.11.0" or "0.11.0-alpha+nightly.20250427".
    const version = typeof logseqInfo === "string" ? logseqInfo : "0.0.0"
    const match = version.match(/(\d+)\.(\d+)\.(\d+)/)
    replaceLogseqVersion(match ? match[0] : version)
}

// Check if the current graph is a DB graph. Returns true only for DB graphs.
// The official API does not exist on 0.10.x hosts (logseq.App is a dynamic proxy, so a typeof
// guard is useless): a rejected call or a non-boolean value means the host is a legacy app
// that cannot open DB graphs.
const checkLogseqDbGraph = async (): Promise<boolean> => {
    try {
        const value = await logseq.App.checkCurrentIsDbGraph()
        return typeof value === "boolean" ? value : false
    } catch {
        return false
    }
}

/**
 * Checks whether the current graph is a DB graph or a file-based graph, and handles related state updates.
 * @returns Promise<boolean[]> - [isDbGraph, isFileGraph]
 */
export const logseqModelCheck = async (): Promise<boolean[]> => {
    await fetchAppVersion() // アプリバージョンを保存(情報用。グラフ種別には使わない)
    const isDbGraph = await checkLogseqDbGraph() // 現在のグラフがDBグラフか
    const isFileGraph = !isDbGraph // 現在のグラフがファイルベースか(= !isDbGraph)
    replaceLogseqMdModel(isFileGraph)

    // Callback when the graph changes: re-detect and update the flag
    logseq.App.onCurrentGraphChanged(async () => {
        replaceLogseqMdModel(!(await checkLogseqDbGraph()))
    })
    return [isDbGraph, isFileGraph]
}
