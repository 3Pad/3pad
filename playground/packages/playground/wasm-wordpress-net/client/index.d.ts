export * from '../../blueprints/src/index.ts';
export type { HTTPMethod, PHPRunOptions, PHPRequest, PHPResponse, UniversalPHP, PHPOutput, PHPResponseData, ErrnoError, PHPRequestHandler, PHPRequestHandlerConfiguration, PHPRequestHeaders, SupportedPHPVersion, RmDirOptions, RuntimeType, } from '../../../php-wasm/universal/src/index.ts';
export { setPhpIniEntries, SupportedPHPVersions, SupportedPHPVersionsList, LatestSupportedPHPVersion, } from '../../../php-wasm/universal/src/index.ts';
export type { PlaygroundClient, MountDescriptor } from '../../remote/src/index.ts';
export { phpVar, phpVars } from '../../../php-wasm/util/src/index.ts';
import { Blueprint, OnStepCompleted } from '../../blueprints/src/index.ts';
import { ProgressTracker } from '../../../php-wasm/progress/src/index.ts';
import type { MountDescriptor, PlaygroundClient } from '../../remote/src/index.ts';
export interface StartPlaygroundOptions {
    iframe: HTMLIFrameElement;
    remoteUrl: string;
    progressTracker?: ProgressTracker;
    disableProgressBar?: boolean;
    blueprint?: Blueprint;
    onBlueprintStepCompleted?: OnStepCompleted;
    /**
     * Called when the playground client is connected, but before the blueprint
     * steps are run.
     *
     * @param playground
     * @returns
     */
    onClientConnected?: (playground: PlaygroundClient) => void;
    /**
     * The SAPI name PHP will use.
     * @internal
     * @private
     */
    sapiName?: string;
    /**
     * Called before the blueprint steps are run,
     * allows the caller to delay the Blueprint execution
     * once the Playground is booted.
     *
     * @returns
     */
    onBeforeBlueprint?: () => Promise<void>;
    siteSlug?: string;
    mounts?: Array<MountDescriptor>;
    shouldInstallWordPress?: boolean;
}
/**
 * Loads playground in iframe and returns a PlaygroundClient instance.
 *
 * @param iframe Any iframe with Playground's remote.html loaded.
 * @param options Options for loading the playground.
 * @returns A PlaygroundClient instance.
 */
export declare function startPlaygroundWeb({ iframe, blueprint, remoteUrl, progressTracker, disableProgressBar, onBlueprintStepCompleted, onClientConnected, sapiName, onBeforeBlueprint, mounts, shouldInstallWordPress, }: StartPlaygroundOptions): Promise<PlaygroundClient>;
