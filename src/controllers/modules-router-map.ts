import { HomeRouterController } from './home.controller';
import { AuthRouterController } from './auth.controller';
import { UserRouterController } from './user.controller';

export interface FeaturedModuleRouter {
    moduleName: any;
    parser: string;
}

export class ModulesRouterMapper {
    
    public registeredModules: Array<FeaturedModuleRouter> = [
        {
            moduleName: HomeRouterController,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: AuthRouterController,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: UserRouterController,
            parser: 'getRoutesFromModules'
        }
    ];
}